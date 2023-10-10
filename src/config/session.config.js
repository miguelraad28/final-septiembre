import MongoSingleton from './mongo.config.js';
import MongoStore from 'connect-mongo';
import enviroment from './enviroment.config.js';
import {logger} from './logger.config.js';
import session from 'express-session';

const {MONGO_URL, SESSION_SECRET} = enviroment;
export const configureSession = () => {
	if (MongoSingleton.hasInstance()) {
		logger.debug('MongoDB instance is available');
		return session({
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			store: MongoStore.create({
				mongoUrl: MONGO_URL,
				ttl: 86400, // expiration: 1 día
			}),
		});
	} else {
		logger.warn(
			'MongoDB instance not available',
		);
		return (req, res, next) => next();
	}
};
