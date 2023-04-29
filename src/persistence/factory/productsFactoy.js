import logger from '../../config/loger.js';
import ProductsDaoMongo from '../DAO/productsDAO.js';

let options = 'mongo';
let dao;

switch (options) {
	case 'mongo':
		dao = ProductsDaoMongo.getInstance();
		await dao.connect();
		break;
	default:
		logger.error('Only DAO Products can be created in MongoDB');
}

export default class ProductsDaoFactory {
	static getDao() {
		return dao;
	}
}
