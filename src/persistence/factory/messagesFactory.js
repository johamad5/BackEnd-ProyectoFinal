import logger from '../../config/loger.js';
import MessagesDaoFile from '../DAO/messagesDAO.js';

let options = 'fs';
let dao;

switch (options) {
	case 'fs':
		dao = MessagesDaoFile.getInstance();
		dao.connect();
		break;
	default:
		logger.error('Only DAO Messages can be created in FileSystem');
}

export default class MessagesDaoFactory {
	static getDao() {
		return dao;
	}
}
