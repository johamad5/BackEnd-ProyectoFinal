import { Router } from 'express';
import authRequired from './Middleware/auth.js';
import adminUserAuthRequired from './Middleware/adminUser.js';
import {
	getAll,
	getUserCart,
	addToCart,
	emptyCart,
	confirmOrder,
	deleteToCart,
} from '../Controllers/carts.js';

const carts = Router();

carts.get('/', adminUserAuthRequired, getAll);
carts.get('/myCart', authRequired, getUserCart);
carts.get('/checkout', authRequired, confirmOrder);
carts.patch('/:productId/:units', authRequired, addToCart);
carts.delete('/deleteCart', authRequired, emptyCart);
carts.delete('/:productId', authRequired, deleteToCart);

export default carts;
