//import { } from '../middlewares/auth.middleware.js';
//import ProductsController from '../controllers/products.controller.js';
//import {Router} from 'express';

//const {

//} = ProductsController;

//const routerProducts = Router();

//routerProducts.get('/', /* Controller */);
//routerProducts.get('/:pid', /* Controller */);
//routerProducts.post('/', /* Middlewares */ /* Controller */);
//routerProducts.put('/:pid',  /* Middlewares */ /* Controller */);
//routerProducts.delete('/:pid',  /* Middlewares */ /* Controller */);

//export default routerProducts;
 

import {isAdmin, isAuthenticated} from '../middlewares/auth.middleware.js';

import express from 'express';
import {initializeProductsController} from '../controllers/products.controller.js';

export const initializeProductsRoutes = async () => {
	const router = express.Router();
	const ProductsControllerInstance = await initializeProductsController();

	const {
		getAllProducts,
		getProductById,
		createProduct,
		updateProduct,
		deleteProduct,
	} = ProductsControllerInstance;

	router.get('/', getAllProducts);
	router.get('/:pid', getProductById);
	router.post('/', isAuthenticated, isAdmin, createProduct);
	router.put('/:pid', isAuthenticated, isAdmin, updateProduct);
	router.delete('/:pid', isAuthenticated, isAdmin, deleteProduct);
	return router;
};
