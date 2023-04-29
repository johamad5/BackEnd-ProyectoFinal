import logger from '../config/loger.js';

const undefinedRoutes = (req, res) => {
	const { url, method } = req;
	logger.warn();
	`Request received by the server. Route ${method} - ${url} nonexistent`;

	res.status(404).send("ERROR: This rout don't exist");
};

export default undefinedRoutes;
