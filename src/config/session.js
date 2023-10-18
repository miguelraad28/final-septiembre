import MongoSingleton from './mongo.js'
import MongoStore from 'connect-mongo'
import env from './environment.js'
import {winstonLogger} from './logger.js'
import session from 'express-session'

const {MONGO_URL, SESSION_SECRET} = env
export const configureSession = () => {
	if (MongoSingleton.hasInstance()) {
		winstonLogger.debug('MongoDB instance is ready')
		return session({
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			store: MongoStore.create({
				mongoUrl: MONGO_URL,
				ttl: 3600*24,
			}),
		})
	} else {
		winstonLogger.warn(
			'MongoDB instance not available',
		)
		return (req, res, next) => next()
	}
}