import ProductsDaoFactory from '../factory/productsFactoy.js';

export default class ProductsRepo {
	dao;

	constructor() {
		this.dao = ProductsDaoFactory.getDao();
	}

	static getInstance() {
		if (!instance) {
			instance = new ProductsRepo();
		}
		return instance;
	}

	async findProd() {
		return await this.dao.findProd();
	}

	async findProdById(id) {
		return await this.dao.findProdById(id);
	}

	async findCompleteProdById(id) {
		return await this.dao.findCompleteProdById(id);
	}

	async getDataByPriceFilter(options) {
		return await this.dao.getDataByPriceFilter(options);
	}

	async newProd() {
		return await this.dao.newProd();
	}

	async saveProd(data) {
		await this.dao.saveProd(data);
	}

	async deleteProdById(id) {
		await this.dao.deleteProdById(id);
	}

	async deleteAllProds() {
		await this.dao.deleteAllProds();
	}

	async updateProdById(id, data) {
		this.dao.updateProdById(id, data);
	}
}
