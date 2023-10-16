import {isMainModule, rootDirectory} from './config/dirname.js';

import compression from 'express-compression';
import {configureSession} from './config/session.js';
import cookieParser from 'cookie-parser';
import environment from './config/environment.js';
//import errorHandler from './middlewares/error.middleware.js';
//import {errorRouter} from './routes/error.routes.js';
import express from 'express';
import handlebars from 'express-handlebars';
import iniPassport from './config/passport.js';
import {initializeAuthRoutes} from './routes/auth.routes.js';
//import {initializeCartsRoutes} from './routes/carts.routes.js';
import {initializeProductsRoutes} from './routes/products.routes.js';
import {initializeViewsRoutes} from './routes/views.routes.js';
import {logger} from './config/logger.js';
//import {loggerRouter} from './routes/logger.routes.js';
//import mockRouter from './routes/mock.routes.js';
import passport from 'passport';
import path from 'path';
//import {specs} from './config/swagger.js';
//import swaggerUiExpress from 'swagger-ui-express';

const {PORT} = environment;

export const initializeApp = async () => {
	const app = express();

	// Middleware setup

	app.use(compression());
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(cookieParser());
	iniPassport();
	app.use(configureSession());
	app.use(passport.initialize());
	app.use(passport.session());

	// Handlebars setup
	app.engine('handlebars', handlebars.engine());
	app.set('views', path.join(rootDirectory, 'views'));
	app.set('view engine', 'handlebars');

	// Static files
	app.use(express.static(path.join(rootDirectory, 'public')));

	// Logger test route
	//app.use('/loggerTest', loggerRouter);

	// Swagger docs route
	// app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

	// Initialize the routes
	const routerProducts = await initializeProductsRoutes();
	const viewsRouter = await initializeViewsRoutes();
	const authRouter = await initializeAuthRoutes();
	//const routerCarts = await initializeCartsRoutes();

	// Route setup
	app.use('/api/products', routerProducts);
	//app.use('/api/carts', routerCarts);
	app.use('/api/users', authRouter);
	app.use('/', viewsRouter);
	//app.use('/mockingproducts', mockRouter);
	app.get('*', (req, res) => {
		return res.status(404).json({
			status: 'error',
			msg: 'Page not found',
			data: {},
		});
	});
	//app.use('/error', errorRouter);

	// Error handling middleware
	//app.use(errorHandler);

	// Return the app object for further use
	return app;
};

// This function will initialize the app and start listening on the specified port
const startServer = async () => {
	try {
		const app = await initializeApp();
		app.listen(PORT, () => {
			logger.info(`Server listening at http://localhost:${PORT}`);
		});
	} catch (error) {
		logger.error(`Failed to start server: ${error}`);
	}
};

// Check if the script is being run directly
if (isMainModule) {
	// Initialize the app and start the server
	startServer();
}
