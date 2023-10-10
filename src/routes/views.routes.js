import {Router} from 'express';
import {initializeAuthController} from '../controllers/auth.controller.js';

export const initializeViewsRoutes = async () => {
	const router = Router();
	const AuthControllerInstance = await initializeAuthController();

	const {
		handleLogout,
		renderLoginForm,
		renderRegisterForm,
	} = AuthControllerInstance;

	router.get('/login', renderLoginForm);
	router.get('/logout', handleLogout);
	router.get('/register', renderRegisterForm);

	return router;
};
