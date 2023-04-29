import MongoStore from 'connect-mongo';
import { URI_MONGO } from './envconfig.js';

const mongoSession = {
	store: MongoStore.create({
		mongoUrl: URI_MONGO,
		mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
	}),
	secret: 'palabraEncriptadora',
	cookie: {
		httpOnly: false,
		secure: false,
		maxAge: 300000,
	},
	rolling: true,
	resave: false,
	saveUninitialized: false,
};

export default mongoSession;
