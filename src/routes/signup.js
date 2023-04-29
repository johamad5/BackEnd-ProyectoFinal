import { Router } from 'express';
import passport from 'passport';
import { localSignupStategy } from '../passport/localAuth.js';
import {
	renderSignupForm,
	signupPost,
	renderSignupError,
} from '../Controllers/signup.js';

const signup = Router();

passport.use('/signup', localSignupStategy);

signup.get('/signup', renderSignupForm);
signup.post(
	'/signup',
	passport.authenticate(localSignupStategy, {
		successRedirect: '/',
		failureRedirect: '/signupError',
		passReqToCallback: true,
	}),
	signupPost
);
signup.get('/signupError', renderSignupError);

export default signup;
