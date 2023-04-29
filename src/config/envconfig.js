import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const URI_MONGO =
	'mongodb+srv://jMad:Desafio13@desafio.flqrhzt.mongodb.net/test';
export const USER = 'johanamadero3@gmail.com';
export const PASS = 'qdkxjeodhtveeobx';
export const ADMIN_EMAIL = 'johanamadero3@gmail.com';
