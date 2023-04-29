import CartsDaoFactory from '../factory/cartsFactory.js';

export default class CartsRepo {
	dao;

	constructor() {
		this.dao = CartsDaoFactory.getDao();
	}

	static getInstance() {
		if (!instance) {
			instance = new CartsRepo();
		}
		return instance;
	}

	async findCarts() {
		return await this.dao.findCarts();
	}

	async findCartById(userId) {
		return await this.dao.findCartById(userId);
	}

	async findCompleteCartById(userId) {
		return await this.dao.findCompleteCartById(userId);
	}

	async addProdToCart(data) {
		return await this.dao.addProdToCart(data);
	}

	async updateProdToCart(data) {
		return await this.dao.updateProdToCart(data);
	}

	async confirmOrder(userId) {
		return await this.dao.confirmOrder(userId);
	}

	async deleteProdById(userId, productId) {
		await this.dao.deleteProdById(userId, productId);
	}

	async deleteCartById(userId) {
		await this.dao.deleteCartById(userId);
	}
}
