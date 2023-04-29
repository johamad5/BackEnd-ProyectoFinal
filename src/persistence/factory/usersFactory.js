import logger from '../../config/loger.js';
import UsersDaoMongo from '../DAO/usersDAO.js';

let options = 'mongo';
let dao;

switch (options) {
	case 'mongo':
		dao = UsersDaoMongo.getInstance();
		await dao.connect();
		break;
	default:
		logger.error('Only DAO Users can be created in MongoDB');
}

export default class UsersDaoFactory {
	static getDao() {
		return dao;
	}
}
