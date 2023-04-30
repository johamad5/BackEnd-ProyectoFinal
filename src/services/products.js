import ProductsRepo from '../persistence/repository/productsRepo.js';

const prodsDAO = new ProductsRepo();

export async function getData() {
	return await prodsDAO.findProd();
}

export async function getDataById(id) {
	return await prodsDAO.findProdById(id);
}

export async function getCompleteDataById(id) {
	return await prodsDAO.findCompleteProdById(id);
}

export async function getDataByPriceFilter(options) {
	return await prodsDAO.getDataByPriceFilter(options);
}

export async function createProduct() {
	return prodsDAO.newProd();
}

export async function saveData(data) {
	await prodsDAO.saveProd(data);
}

export async function updateProdById(id, data) {
	await prodsDAO.updateProdById(id, data);
}

export async function deleteProdById(id) {
	await prodsDAO.deleteProdById(id);
}

export async function deleteAllprods() {
	await prodsDAO.deleteAllProd();
}
