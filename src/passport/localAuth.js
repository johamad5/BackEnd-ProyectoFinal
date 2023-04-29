import passport from 'passport';
import logger from '../config/loger.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { userModels } from '../persistence/factory/models/user.js';
import bCrypt from 'bcrypt';
import CartsDaoMongo from '../persistence/DAO/cartsDAO.js';
import { URI_MONGO, USER, PASS } from '../config/envconfig.js';
import { cartModels } from '../persistence/factory/models/cart.js';
import { createTransport } from 'nodemailer';

const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: USER,
		pass: PASS,
	},
});

const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const cartDB = new CartsDaoMongo(URI_MONGO, advanceOptions, cartModels);

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

export const localSignupStategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		// permite hacer uso de req para manejar datos que vegan por body
		passReqToCallback: true,
	},
	async (req, email, password, done) => {
		const user = await userModels.findOne({ email: email });
		const { name, address, age, phone, code } = req.body;

		let admin = false;
		if (code === 'TatoEl1') {
			admin = true;
		}

		const mailOptions = {
			from: 'Servidor',
			to: 'johanamadero3@gmail.com',
			subject: 'Nuevo registro de Usuario.',
			html: `<h2> Se registró un nuevo usuario en el sistema. <br/></h2>
			<h3>Datos del nuevo usuario: <h3/> <br/>
			<p>
			- Nombre: ${name} <br/>
			- Dirección: ${address}<br/> 
			- Edad: ${age}<br/> 
			- Telefono: ${phone}<br/>
			- AdminRole: ${admin} </p>`,
		};

		if (user) {
			return done(null, false);
		} else {
			const userCart = await cartDB.create(email, address);
			const newUser = new userModels();
			newUser.name = name;
			newUser.cartId = userCart;
			newUser.email = email;
			newUser.password = createHash(password);
			newUser.address = address;
			newUser.phone = phone;
			newUser.age = age;
			newUser.admin = admin;

			await newUser.save();
			logger.info('Successfully registered user.');
			await cartDB.associateCart(email, newUser._id);
			logger.info('Cart associated with the user.');

			try {
				const data = await transporter.sendMail(mailOptions);
			} catch (e) {
				logger.error(e);
			}

			done(null, newUser);
		}
	}
);

export const localLoginStrategy = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		// permite hacer uso de req para manejar datos que vegan por body
		passReqToCallback: true,
	},
	async (req, email, password, done) => {
		const user = await userModels.findOne({ email: email });

		if (!user) {
			return done(null, false);
		}

		if (!isValidPassword(user, password)) {
			return done(null, false);
		} else {
			return done(null, user);
		}
	}
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
	const user = await userModels.findOne({ _id: _id });
	done(null, user);
});
