import { getAllUsers, getUserById, getUserBiEmail } from '../services/users.js';
import logger from '../config/loger.js';

export const getAll = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /users${url}`);

	const allUsers = await getAllUsers();

	if (allUsers == undefined) {
		res.status(404).json({
			Action: `Get all users from the database.`,
			Message: `ERROR: Users not found.`,
		});
	} else {
		res.status(200).json({
			Action: `Get all users from the database.`,
			Data: allUsers,
		});
	}
};

export const getById = async (_id) => {
	const user = await getUserById(_id);
	return user;
};

export const getOneUserById = async (req, res) => {
	const _id = req.params.id;
	const user = await getUserById(_id);
	if (user == undefined) {
		res.status(404).json({
			Action: `Get users from the database.`,
			Message: `ERROR: Users not found.`,
		});
	} else {
		res.status(200).json({
			Action: `Get users from the database.`,
			Data: user,
		});
	}
};

export const getByEmail = async (email) => {
	const user = await getUserBiEmail(email);
	return user;
};
