import dotenv from 'dotenv';
import { logger } from './logger.js';

const env = {MODE: process.argv[2]};
const {MODE} = env;
if (MODE != 'DEV' && MODE != 'PROD') {
	logger.error('You are not selecting a valid environment');
	process.exit();
}
dotenv.config({
	path:
		process.argv[2] === 'DEV'
			? './.env.DEV'
			: './.env.PROD',
});

env.PORT = process.env.PORT;
env.NODE_ENV = process.env.NODE_ENV;

env.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
env.GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
env.GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;

env.PERSISTANCE = process.env.PERSISTANCE;

env.MONGO_URL = process.env.MONGO_URL;

env.SESSION_SECRET = process.env.SESSION_SECRET;

env.GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
env.GOOGLE_PASS = process.env.GOOGLE_PASS;

env.MONGO_URL = process.env.MONGO_URL;
env.NODE_ENV = process.env.NODE_ENV;
env.PERSISTANCE = process.env.PERSISTANCE

export default env;
