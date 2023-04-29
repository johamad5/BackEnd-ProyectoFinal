import mongoose from 'mongoose';
import logger from '../../config/loger.js';
import { transformToDTO } from '../DTO/cartsDTO.js';
import { URI_MONGO } from '../../config/envconfig.js';
import { cartModels } from '../factory/models/cart.js';

const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };

let instance = null;

export default class CartsDaoMongo {
	constructor(URI, Options, Models) {
		this.model = Models;
		this.Options = Options;
		this.URI = URI;
	}

	static getInstance() {
		if (!instance) {
			instance = new CartsDaoMongo(URI_MONGO, advanceOptions, cartModels);
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
		logger.info('Mongo DB connected - Cart Storage');
	}

	async disconnect() {
		await mongoose.disconnect();
		logger.info('Mongo DB diconnected - Cart Storage');
	}

	async setNewDate(userId) {
		const fechaActual = new Date();
		const año = fechaActual.getFullYear();
		const mes = fechaActual.getMonth();
		const dia = fechaActual.getDate();
		const hora = fechaActual.getHours();
		const minutos = fechaActual.getMinutes();
		const segundos = fechaActual.getSeconds();

		const newDate = `${dia}/${mes + 1}/${año} | ${hora}:${minutos}:${segundos}`;
		await this.model.updateOne(
			{ userId: userId },
			{ $set: { dataTime: newDate } }
		);
	}

	async create(email, address) {
		const newCart = new this.model();

		newCart.userId = email;
		newCart.products = [];
		newCart.deliveryAddress = address;
		newCart.dataTime = 'date';

		await newCart.save();
		return newCart._id;
	}

	async associateCart(email, userId) {
		await this.model.updateOne({ userId: email }, { $set: { userId: userId } });
		await this.setNewDate(userId);
	}

	async findCarts() {
		return transformToDTO(await this.model.find({}));
	}

	async findCartById(userId) {
		return transformToDTO(await this.model.find({ userId }));
	}

	async findCompleteCartById(userId) {
		const cart = await this.model.find({ userId });
		return cart;
	}

	async addProdToCart(data) {
		const { userId, newProd } = data;

		await this.model.updateOne(
			{ userId },
			{ $push: { products: newProd } },
			{ strict: false }
		);
		await this.setNewDate(userId);
		return true;
	}

	async updateProdToCart(data) {
		const { userId, newUnits, productId } = data;

		await this.model.updateOne(
			{ userId },
			{ $set: { 'products.$[prod].units': newUnits } },
			{ arrayFilters: [{ 'prod.productId': `${productId}` }] }
		);
		await this.setNewDate(userId);
		return true;
	}

	async deleteProdById(userId, productId) {
		await this.model.updateOne(
			{ userId },
			{ $pull: { products: { productId } } }
		);
	}

	async deleteCartById(userId) {
		await this.model.updateOne({ userId }, { $set: { products: [] } });
	}
}
