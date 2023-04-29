import logger from '../../config/loger.js';
import CartsDaoMongo from '../DAO/cartsDAO.js';

let options = 'mongo';
let dao;

switch (options) {
	case 'mongo':
		dao = CartsDaoMongo.getInstance();
		await dao.connect();
		break;
	default:
		logger.error('Only DAO Carts can be created in MongoDB');
}

export default class CartsDaoFactory {
	static getDao() {
		return dao;
	}
}
