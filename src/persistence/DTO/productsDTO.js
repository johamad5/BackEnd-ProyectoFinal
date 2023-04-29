export default class ProductsDTO {
	constructor({ title, productId, stock, thumbnail, price }) {
		this.title = `[ ${productId} ] - ${title}`;
		this.stock = `${stock} units.`;
		this.price = `$ ${price}`;
		this.thumbnail = thumbnail;
	}
}

export function transformToDTO(producst) {
	if (Array.isArray(producst)) {
		return producst.map((prod) => new ProductsDTO(prod));
	} else {
		return new ProductsDTO(producst);
	}
}
