import dotenv from 'dotenv'
import {winstonLogger} from './logger.js'

const env = {EXECUTIONCMODE: process.env.TEST_MODE || process.argv[2]}
const {EXECUTIONMODE} = env

if (!['development', 'production'].includes(EXECUTIONMODE)) {
	winstonLogger.error('Error loading environment configuration. Please check your environment variables and configuration files.')
	process.exit()
}

dotenv.config({ path: process.argv[2] === 'development' ? './.env.DEV' : './.env.PROD'})

env.PORT = process.env.PORT
env.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
env.GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
env.GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL
env.MONGO_URL = process.env.MONGO_URL
env.SESSION_SECRET = process.env.SESSION_SECRET
env.PERSISTANCE = process.env.PERSISTANCE
env.NODE_ENV = process.env.NODE_ENV
env.GOOGLE_EMAIL = process.env.GOOGLE_EMAIL
env.GOOGLE_PASS = process.env.GOOGLE_PASS

export default env
