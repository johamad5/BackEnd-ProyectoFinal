import mongoose from 'mongoose';
import logger from '../../config/loger.js';
import { transformToDTO } from '../DTO/usersDTO.js';
import { URI_MONGO } from '../../config/envconfig.js';
import { userModels } from '../factory/models/user.js';

mongoose.set('useFindAndModify', false);
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let instance = null;

export default class UsersDaoMongo {
	constructor(URI, options, models) {
		this.Options = options;
		this.URI = URI;
		this.model = models;
	}

	static getInstance() {
		if (!instance) {
			instance = new UsersDaoMongo(URI_MONGO, advanceOptions, userModels);
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
		logger.info('Mongo DB connected - User Storage');
	}

	async disconnect() {
		await mongoose.disconnect();
		logger.info('Mongo DB diconnected - User Storage');
	}

	async findAllUsers() {
		return transformToDTO(await this.model.find({}));
	}

	async findUserById(_id) {
		return transformToDTO(await this.model.findOne({ _id }));
	}

	async findAllUserInfoById(_id) {
		return await this.model.findOne({ _id });
	}

	async findUserByEmail(email) {
		return await this.model.findOne({ email });
	}
}
