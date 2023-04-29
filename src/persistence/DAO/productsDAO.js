import mongoose from 'mongoose';
import logger from '../../config/loger.js';
import { transformToDTO } from '../DTO/productsDTO.js';
import { URI_MONGO } from '../../config/envconfig.js';
import { productModels } from '../factory/models/product.js';
mongoose.set('useFindAndModify', false);
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let instance = null;

export default class ProductsDaoMongo {
	constructor(URI, options, models) {
		this.Options = options;
		this.URI = URI;
		this.model = models;
	}

	static getInstance() {
		if (!instance) {
			instance = new ProductsDaoMongo(URI_MONGO, advanceOptions, productModels);
		}
		return instance;
	}

	async connect() {
		await mongoose
			.connect(this.URI, this.Options)
			.then((db) => {})
			.catch((err) => {
				logger.error(`Error connecting to the database. ${err}`);
			});
		logger.info('Mongo DB connected - Product Storage');
	}

	async disconnect() {
		await mongoose.disconnect();
		logger.info('Mongo DB diconnected - Product Storage');
	}

	async findProd() {
		return transformToDTO(await this.model.find({}));
	}

	async findProdById(id) {
		return transformToDTO(await this.model.find({ productId: id }));
	}

	async findCompleteProdById(id) {
		return await this.model.find({ productId: id });
	}

	async newProd() {
		return new this.model();
	}

	async updateProdById(id, data) {
		await this.model.updateOne({ productId: id }, { $set: data });
	}

	async deleteProdById(id) {
		await this.model.deleteOne({ productId: id });
	}

	async deleteAllProds() {
		await this.model.delete({});
	}

	async saveProd(data) {
		await data.save();
	}
}
