import { Router } from 'express';
import { getAll, getOneUserById } from '../Controllers/users.js';
import adminUserAuthRequired from './Middleware/adminUser.js';
const users = Router();

users.get('/all', adminUserAuthRequired, getAll);
users.get('/:id', adminUserAuthRequired, getOneUserById);

export default users;
