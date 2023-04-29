import logger from '../../config/loger.js';

function authRequired(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		const { url, method } = req;
		logger.warn(
			`Unauthorized: View a page without being authenticated. Route ${method} - ${url}`
		);
		res.status(401).json({
			Action: 'View a page without being authenticated.',
			Message:
				'Unauthorized. If you want to see this page, you first need to log in.',
		});
	}
}

export default authRequired;
