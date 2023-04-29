import logger from '../config/loger.js';

export const renderSignupForm = (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - ${url}`);

	res.render('pages/signup.ejs');
};

export const signupPost = (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - ${url}`);
};

export const renderSignupError = (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - ${url}`);

	res.status(400).json({
		Action: `Register user.`,
		Message: 'Bad Request. Make sure you write the data correctly! Try again.',
	});
};
