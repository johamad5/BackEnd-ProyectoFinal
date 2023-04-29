import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	address: { type: String, required: true },
	age: { type: Number, required: true },
	phone: { type: Number, required: true },
	admin: { type: Boolean },
	cartId: { type: String },
});

export const userModels = mongoose.model('users', userSchema);
