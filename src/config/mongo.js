import CustomError from '../services/errors/custom-error.js'
import ErrorsEnums from '../services/errors/enums.js'
import env from './environment.js'
import {winstonLogger} from './logger.js'
import mongoose from 'mongoose'

const {MONGO_URL} = env
export default class MongoSingleton {
	static #mongoInstance
	static #MAX_ATTEMPTS = 3

	static async connectToMongoDB() {
		let attempt = 0
		while (attempt < this.#MAX_ATTEMPTS) {
			try {
				await mongoose.connect(MONGO_URL, {
					useNewUrlParser: true,
					useUnifiedTopology: true,
					dbName: 'ecommerce',
				});
				winstonLogger.info('Connected to MongoDB');

				return;
			} catch (err) {
				winstonLogger.error('Failed to connect to MongoDB:', err)
				attempt++;
				winstonLogger.warn(`Attempt ${attempt} of ${this.#MAX_ATTEMPTS}`)
				await new Promise(resolve => setTimeout(resolve, 2000))
			}
		}
		throw CustomError.createError({
			name: 'MongoConnectionError',
			cause: new Error('Failed to connect to MongoDB'),
			message: 'Max attempts reached. Failed to connect to MongoDB.',
			code: ErrorsEnums.DATABASE_ERROR,
		})
	}

	static hasInstance() {
		return !!this.#mongoInstance
	}

	static async getInstance() {
		if (this.#mongoInstance) {
			winstonLogger.debug('Reusing existing MongoDB connection')
			return this.#mongoInstance
		}
		winstonLogger.info('Creating new MongoDB connection instance')
		this.#mongoInstance = new MongoSingleton()
		await this.connectToMongoDB()
		return this.#mongoInstance
	}	
}
