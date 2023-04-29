import logger from '../config/loger.js';
import { getAllInfoUserById } from '../services/users.js';
export const renderLoginError = (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - ${url}`);

	res.status(401).json({
		Action: `User Login`,
		Message: 'Access with incorrect credentials. Try again.',
	});
};

export const logout = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - ${url}`);

	let _id = req.session.passport?.user;
	let user = await getAllInfoUserById(_id);
	if (user?.name === undefined) {
		res.status(404).json({
			Action: 'Logout',
			Message: 'There was a problem deleting your session. Try again.',
		});
	} else {
		req.session.destroy((err) => {
			if (err) {
				res.status(404).json({
					Action: 'Logout',
					Message: 'There was a problem deleting your session. Try again.',
				});
			} else {
				res.status(200).json({
					Action: 'Logout',
					Message: `Session closed successfully. See you later ${user.name}.`,
				});
			}
		});
	}
};

export const loginPost = (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - ${url}`);
};
