import { Router } from 'express';
import undefinedRoutes from '../Controllers/others.js';

const othersRoutes = Router();

othersRoutes.get('*', undefinedRoutes);

export default othersRoutes;
