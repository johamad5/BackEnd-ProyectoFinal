import { Router } from 'express';
import passport from 'passport';
import { localLoginStrategy } from '../passport/localAuth.js';
import { renderLoginError, logout, loginPost } from '../Controllers/login.js';

const login = Router();

passport.use('/login', localLoginStrategy);

login.post(
	'/login',
	passport.authenticate(localLoginStrategy, {
		successRedirect: '/',
		failureRedirect: '/loginError',
		passReqToCallback: true,
	}),
	loginPost
);
login.get('/loginError', renderLoginError);
login.get('/logout', logout);

export default login;
