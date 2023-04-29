import UsersDaoFactory from '../factory/usersFactory.js';

export default class UsersRepo {
	dao;

	constructor() {
		this.dao = UsersDaoFactory.getDao();
	}

	static getInstance() {
		if (!instance) {
			instance = new UsersRepo();
		}
		return instance;
	}

	async findAllUsers() {
		return await this.dao.findAllUsers();
	}

	async findUserById(_id) {
		return await this.dao.findUserById(_id);
	}

	async findAllUserInfoById(_id) {
		return await this.dao.findAllUserInfoById(_id);
	}

	async findUserByEmail(email) {
		return await this.dao.findUserByEmail(email);
	}
}
