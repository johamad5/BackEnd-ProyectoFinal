import {
	getData,
	getDataById,
	getCompleteDataById,
	createProduct,
	saveData,
	updateProdById,
	deleteProdById,
	deleteAllprods,
} from '../services/products.js';
import logger from '../config/loger.js';

export const getAll = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /prods${url}`);

	const data = await getData();
	res
		.status(200)
		.json({ Action: 'Get all products from the database', Data: data });
};

export const getOneById = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /prods${url}`);

	const id = req.params.id;
	const prod = await getDataById(id);

	if (prod.length === 0) {
		res.status(404).json({
			Action: `Get a product with ID = ${id} from the database.`,
			Message: `ERROR: Product not found.`,
		});
	} else {
		res.status(200).json({
			Action: `Get a product with ID = ${id} from the database.`,
			Data: prod,
		});
	}
};

export const getAllOneDataById = async (id) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /prods${url}`);

	const prod = await getCompleteDataById(id);

	if (prod.length === 0) {
		res.status(404).json({
			Action: `Get a product with ID = ${id} from the database.`,
			Message: `ERROR: Product not found.`,
		});
	} else {
		res.status(200).json({
			Action: `Get a product with ID = ${id} from the database.`,
			Data: prod,
		});
	}
};

export const save = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /prods${url}`);
	const data = await getData();
	const newID = data.length + 1 || 1;
	const newProduct = await createProduct();

	let { title, category, price, stock, thumbnail } = req.body;

	(newProduct.productId = newID),
		(newProduct.title = title),
		(newProduct.category = category || 'undefined'),
		(newProduct.price = price),
		(newProduct.stock = stock || 10),
		(newProduct.thumbnail =
			thumbnail ||
			'https://e7.pngegg.com/pngimages/856/378/png-clipart-computer-icons-question-mark-orange-question-mark-text-logo.png'),
		await saveData(newProduct);
	const prod = await getDataById(newID);
	res.status(201).json({
		Action: 'Create new product.',
		Data: prod,
	});
};

export const updateById = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /prods${url}`);
	const id = req.params.id;
	const data = req.body;

	await updateProdById(id, data);
	res.status(204).send();
};

export const deleteById = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /prods${url}`);
	const id = req.params.id;

	await deleteProdById(id);

	res.status(204).send();
};

export const deleteAll = async (req, res) => {
	const { url, method } = req;
	logger.info(`Request received by the server. Route ${method} - /prods${url}`);

	await deleteAllprods();

	res.status(204).send();
};
