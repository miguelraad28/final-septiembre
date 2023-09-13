import { } from '../middlewares/auth.middleware.js';
import ProductsController from '../controllers/products.controller.js';
import {Router} from 'express';

const {

} = ProductsController;

const routerProducts = Router();

routerProducts.get('/', /* Controller */);
routerProducts.get('/:pid', /* Controller */);
routerProducts.post('/', /* Middlewares */ /* Controller */);
routerProducts.put('/:pid',  /* Middlewares */ /* Controller */);
routerProducts.delete('/:pid',  /* Middlewares */ /* Controller */);

export default routerProducts;
