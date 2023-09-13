import dotenv from 'dotenv';

const enviroment = {MODE: process.argv[2]};
const {MODE} = enviroment;
if (MODE != 'DEV' && MODE != 'PROD') {
	console.error('You are not selecting a valid enviroment');
	process.exit();
}
dotenv.config({
	path:
		process.argv[2] === 'DEV'
			? './.env.DEV'
			: './.env.PROD',
});

enviroment.PORT = process.env.PORT;
enviroment.MONGO_URL = process.env.MONGO_URL;
enviroment.NODE_ENV = process.env.NODE_ENV;

export default enviroment;
