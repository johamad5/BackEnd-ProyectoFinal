import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import passport from 'passport';
import login from './src/routes/login.js';
import signup from './src/routes/signup.js';
import home from './src/routes/home.js';
import products from './src/routes/products.js';
import users from './src/routes/users.js';
import carts from './src/routes/carts.js';
import othersRoutes from './src/routes/others.js';
import swaggerSpecs from './src/config/swagger.js';
import { PORT, NODE_ENV } from './src/config/envconfig.js';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import MsgController from './src/Controllers/messages.js';
import parseArgs from 'minimist';
import cluster from 'cluster';
import os from 'os';
import logger from './src/config/loger.js';
import mongoSession from './src/config/mongoSession.js';
import cors from 'cors';

const numCPUs = os.cpus().length;

const config = {
	alias: {
		p: 'port',
		m: 'mode',
		mf: 'msgFactory',
		pf: 'prodsFactory',
	},
	default: {
		port: 8080,
		mode: 'FORK',
		msgFactory: 'fs',
		prodsFactory: 'mongo',
	},
};

export const { mode, port, _, prodsFactory, msgFactory } = parseArgs(
	process.argv.slice(2),
	config
);

if (mode.toUpperCase() !== 'FORK' && mode.toUpperCase() !== 'CLUSTER') {
	throw Error(`The ${mode.toUpperCase()} mode is an invalid working mode.`);
}

if (mode.toUpperCase() === 'CLUSTER' && cluster.isPrimary) {
	logger.info(`Primary process - PID: ${process.pid}`);

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();

		cluster.on('exit', (worker, code, signal) => {
			logger.info(`Worker process terminated - PID: ${worker.process.pid}`);
		});
	}
} else {
	logger.info(`The server started in mode: ${mode} - PID: ${process.pid}`);
	runServer();
}

function runServer() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const app = express();
	const port = process.argv[3] || PORT;
	const httpServer = createServer(app);
	const io = new Server(httpServer, { cors: { origin: '*' } });
	const msgC = new MsgController();

	app.use(cors());
	app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use('/public', express.static(__dirname + '/public'));
	app.use(cookieParser());
	app.use(session(mongoSession));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use('/', home);
	app.use('/', login);
	app.use('/', signup);
	app.use('/prods', products);
	app.use('/users', users);
	app.use('/carts', carts);
	app.use('/', othersRoutes);

	app.set('view engine', 'ejs');

	io.on('connection', async (socket) => {
		let msgs = await msgC.getAll();

		io.sockets.emit('chat', msgs);

		socket.on('usserMsg', async (data) => {
			await msgC.save(data);

			let msgs = await msgC.getAll();
			io.sockets.emit('chat', msgs);
		});
	});

	httpServer.listen(PORT, () => {
		logger.info(`SERVER ON [ ${NODE_ENV} ] --> http://localhost:${port}`);
	});

	httpServer.on('error', (err) => {
		logger.error(`SERVER ERROR: ${err}`);
	});
}
