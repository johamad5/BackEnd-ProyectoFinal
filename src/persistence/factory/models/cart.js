import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
	userId: { type: String },
	deliveryAddress: { type: String, required: true },
	dataTime: { type: String, required: true },
	products: [
		{
			productId: { type: String },
			name: { type: String },
			price: { type: Number },
			units: { type: Number },
		},
	],
});

export const cartModels = mongoose.model('carts', cartSchema);
