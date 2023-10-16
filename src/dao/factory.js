import MongoSingleton from '../config/mongo.js';
import env from '../config/environment.js';

export let isMongoConnected = false;

export const DAOFactory = async entity => {
	let DAO;
    console.log("--" + env.PERSISTANCE + "--")
	switch (env.PERSISTANCE) {
		case 'MONGO':
			await MongoSingleton.getInstance();

			DAO = await import(`./mongo/${entity}.mongo.js`);
			break;

		case 'MEMORY':
			DAO = await import(`./memory/${entity}.memory.js`);
			break;

		case 'FS':
			DAO = await import(`./fs/${entity}.fs.js`);
			break;

		default:
			throw new Error('Persistence method not supported');
	}

	return DAO.default;
};
