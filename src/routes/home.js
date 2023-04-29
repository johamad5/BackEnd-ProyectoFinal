import { Router } from 'express';
import renderHome from '../Controllers/home.js';

const home = new Router();

home.get('/', renderHome);

export default home;
