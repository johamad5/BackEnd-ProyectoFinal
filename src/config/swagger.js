import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'PROYECTO FINAL  - Documentación',
			description:
				'Se muestran las diferentes rutas existentes para manejar la API creada para el proyecto final de Back End.',
		},
	},
	apis: [`./src/documentation/*.yaml`],
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;
