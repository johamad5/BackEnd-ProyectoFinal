import { getById } from '../../Controllers/users.js';
import logger from '../../config/loger.js';

async function adminUserAuthRequired(req, res, next) {
	const { url, method } = req;
	if (req.isAuthenticated()) {
		const _id = req.session.passport?.user;
		const user = await getById(_id);

		if (user.admin) {
			next();
		} else {
			logger.warn(
				`Unauthorized: View a page without being authenticated as an administrator user. Route ${method} - ${url}`
			);
			res.status(401).json({
				Action:
					'View a page without being authenticated as an administrator user.',
				Message:
					'Unauthorized. If you want to see this page, you must first login with administrator credentials.',
			});
		}
	} else {
		logger.warn(
			`Unauthorized: View a page without being authenticated as an administrator user. Route ${method} - ${url}`
		);
		res.status(401).json({
			Action:
				'View a page without being authenticated as an administrator user.',
			Message:
				'Unauthorized. If you want to see this page, you must first login with administrator credentials.',
		});
	}
}

export default adminUserAuthRequired;
