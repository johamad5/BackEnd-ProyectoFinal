import UsersRepo from '../persistence/repository/usersRepo.js';

const usersDAO = new UsersRepo();

export async function getAllUsers() {
	return await usersDAO.findAllUsers();
}

export async function getUserById(_id) {
	return await usersDAO.findUserById(_id);
}

export async function getAllInfoUserById(_id) {
	return await usersDAO.findAllUserInfoById(_id);
}

export async function getUserBiEmail(email) {
	return await usersDAO.findUserByEmail(email);
}
