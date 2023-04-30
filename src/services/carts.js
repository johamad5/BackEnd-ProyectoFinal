import CartsRepo from '../persistence/repository/cartsRepo.js';
import { getCompleteDataById, updateProdById } from './products.js';
import { getAllInfoUserById } from './users.js';
import { USER, PASS, ADMIN_EMAIL } from '../config/envconfig.js';
import { createTransport } from 'nodemailer';

const transporter = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: USER,
		pass: PASS,
	},
});

const cartsDAO = new CartsRepo();

export async function getAllCarts() {
	return await cartsDAO.findCarts();
}

export async function getCartById(userId) {
	return await cartsDAO.findCartById(userId);
}

export async function addProdToCart(data) {
	const { userId, productId, units } = data;
	const prodToAdd = await getCompleteDataById(productId);
	const myCart = await cartsDAO.findCompleteCartById(userId);
	const myProds = myCart[0].products;
	const exist = myProds.some((prod) => prod.productId == productId);

	if (prodToAdd[0] == undefined) {
		return 0;
	}
	if (prodToAdd[0].stock == 0) {
		return 1;
	}

	if (prodToAdd[0].stock < units) {
		return 2;
	}
	const remainingUnits = prodToAdd[0].stock - units;

	if (!exist) {
		const newProd = {
			productId: prodToAdd[0].productId,
			name: prodToAdd[0].title,
			price: prodToAdd[0].price,
			units: Number(units),
		};
		let data = {
			userId,
			newProd,
			productId,
		};
		const add = await cartsDAO.addProdToCart(data);

		if (add) {
			await updateProdById(productId, { stock: remainingUnits });
			return 3;
		}
	} else {
		let ProdToModify = myProds.find((prod) => prod.productId == productId);
		const newUnits = (ProdToModify.units += Number(units));
		let data = {
			userId,
			newUnits,
			productId,
		};
		const update = await cartsDAO.updateProdToCart(data);
		if (update) {
			await updateProdById(productId, { stock: remainingUnits });

			return 4;
		}
	}
}

export async function confirmOrderById(userId) {
	const user = await getAllInfoUserById(userId);
	const myCart = await cartsDAO.findCompleteCartById(userId);
	const myProds = myCart[0].products;

	const value = typeof myProds[0]?.price;
	if (value == 'undefined') {
		return 'no products';
	}

	let productList = '';
	let amount = 0;
	myProds.map((prod) => {
		let { name, units, price } = prod;
		amount += units * price;
		productList += `
		<tr>
			<td><strong>${name}</strong></td>
		</tr>
		<tr>
			<td>$${price}  -  x${units}</td>
		</tr>  
			`;
	});

	const mailAdminOptions = {
		from: 'Servidor',
		to: ADMIN_EMAIL,
		subject: `Nuevo pedido de ${user.name}`,
		html: `<h2> Se registró un nuevo pedido en el sistema. <br/></h2>
	<h3>Productos: <h3/> <br/>
	<table>
		<tr>
			<th>Detalle de la compra</th>
		</tr>
			${productList}
		</table>
		<p>TOTAL = $ ${amount}.
		
		<table>
		<tr>
			<th>Detalle del comprador</th>
		</tr>
		<tr>
			<td>Nombre  -  ${user.name}</td>
		</tr> 		
		<tr>
			<td>Correo  -  ${user.email}</td>
		</tr> 		
		<tr>
			<td>Dirección  -  ${user.address}</td>
		</tr> 		
		</table>`,
	};

	const mailClientOptions = {
		from: 'Servidor',
		to: user.email,
		subject: `${user.name}, su pedido se ha realizado con éxito!`,
		html: `<h2> Detalle de su compra <br/></h2>
	<table>
		<tr>
			<th>Productos:</th>
		</tr>
			${productList}
		</table>
		<p>TOTAL = $ ${amount}.,
		<p>Dirección de entrega: ${user.address}.`,
	};

	try {
		await transporter.sendMail(mailAdminOptions);
		await transporter.sendMail(mailClientOptions);
		return 'ok';
	} catch (e) {
		return undefined;
	}
}

export async function removeProdToCart(data) {
	const { userId, productId } = data;
	const myCart = await cartsDAO.findCompleteCartById(userId);
	const myProds = myCart[0].products;
	const exist = myProds.some((prod) => prod.productId == productId);

	if (!exist) {
		return 0;
	} else {
		const prodToDelete = myProds.find((prod) => prod.productId == productId);
		const unitsToAdd = prodToDelete.units;
		const prodToModify = await getCompleteDataById(productId);
		const newStock = unitsToAdd + prodToModify[0].stock;
		await updateProdById(productId, { stock: newStock });
		await cartsDAO.deleteProdById(userId, productId);
		return 1;
	}
}

export async function deleteCart(userId) {
	await cartsDAO.deleteCartById(userId);
}
