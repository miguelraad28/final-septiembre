import MongoSingleton from './mongo.js';
import MongoStore from 'connect-mongo';
import enviroment from './environment.js';
import {logger} from './logger.js';
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
				ttl: 172800,
			}),
		});
	} else {
		logger.warn(
			'MongoDB instance not available',
		);
		return (req, res, next) => next();
	}
};
