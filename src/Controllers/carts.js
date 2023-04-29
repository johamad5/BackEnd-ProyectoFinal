import logger from '../config/loger.js';
import {
	getAllCarts,
	getCartById,
	addProdToCart,
	confirmOrderById,
	deleteCart,
	removeProdToCart,
} from '../services/carts.js';

export const getAll = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /carts${url}`);

	const allCarts = await getAllCarts();
	if (allCarts == undefined) {
		logger.error(`ERROR: Carts not found.`);
		res.status(404).json({
			Action: `Get all carts from the database.`,
			Message: `ERROR: Carts not found.`,
		});
	} else {
		res.status(200).json({
			Action: 'Get all carts from the database.',
			Data: allCarts,
		});
	}
};

export const getUserCart = async (req, res) => {
	const { url, method } = req;
	const userId = req.session.passport?.user;
	logger.info(`Request received by the server. Route ${method} - /carts${url}`);

	const userCart = await getCartById(userId);

	if (userCart == undefined) {
		logger.error(`ERROR: Cart not found.`);
		res.status(404).json({
			Action: `Get cart from the database.`,
			Message: `ERROR: Cart not found.`,
		});
	}
	res.status(200).json({
		Action: 'Get cart from the database.',
		Data: userCart[0],
	});
};

export const addToCart = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /carts${url}`);

	const data = {
		userId: req.session.passport.user,
		productId: req.params.productId,
		units: req.params.units,
	};
	const result = await addProdToCart(data);
	switch (result) {
		case 0:
			res.status(400).json({
				Action: 'Add product to the cart.',
				Message: `ERROR: We don't have a product with the ID = ${data.productId}.`,
			});
			break;
		case 1:
			res.status(400).json({
				Action: 'Add product to the cart.',
				Message: `ERROR: The product cannot be added to the cart. We don't have units available.`,
			});
			break;
		case 2:
			res.status(400).json({
				Action: 'Add product to the cart.',
				Message: `ERROR: The product cannot be added to the cart. We don't have ${data.units} units.`,
			});
			break;
		case 3:
			res.status(204).send();
			break;
		case 4:
			res.status(204).send();
			break;
		default:
			res.status(400).json({
				Action: 'Add product to the cart.',
				Message: `ERROR: The product cannot be added to the cart.`,
			});
			break;
	}
};

export const deleteToCart = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /carts${url}`);

	const data = {
		userId: req.session.passport.user,
		productId: req.params.productId,
	};
	const result = await removeProdToCart(data);

	switch (result) {
		case 0:
			res.status(400).json({
				Action: 'Delete product to the cart.',
				Message: `ERROR: We don't have a product with the ID = ${data.productId} in the cart to delete.`,
			});
			break;
		case 1:
			res.status(200).json({
				Action: 'Delete product to the cart.',
				Message: `Product with the ID = ${data.productId} in the cart deleted.`,
			});
			break;
	}
};

export const confirmOrder = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /carts${url}`);
	const userId = req.session.passport.user;

	const order = await confirmOrderById(userId);
	switch (order) {
		case undefined:
			logger.error(`ERROR: The order cannot be confirmed.`);
			res.status(404).json({
				Action: `Confirm order.`,
				Message: `ERROR: The order cannot be confirmed.`,
			});
			break;
		case 'no products':
			logger.error(`ERROR: Cart without products.`);
			res.status(404).json({
				Action: `Confirm order.`,
				Message: `ERROR: Cart without products.`,
			});
			break;
		default: {
			await deleteCart(userId);
			res.status(200).json({
				Action: 'Confirm order.',
				Data: 'You will receive a notification by email with the details of your purchase. Thank you very much for choosing us :)   ',
			});
		}
	}
};

export const emptyCart = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /carts${url}`);
	const userId = req.session.passport.user;
	await deleteCart(userId);

	res.status(204).send();
};
