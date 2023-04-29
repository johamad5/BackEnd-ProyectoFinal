export default class CartsDTO {
	constructor({ userId, dataTime, deliveryAddress, products }) {
		this.userId = `${userId}`;
		this.lastModification = `${dataTime}`;
		this.products = products;
		this.direction = `${deliveryAddress}`;
	}
}

export function transformToDTO(cart) {
	if (Array.isArray(cart)) {
		return cart.map((one) => new CartsDTO(one));
	} else {
		return new CartsDTO(cart);
	}
}
