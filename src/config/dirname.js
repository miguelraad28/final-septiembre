import {fileURLToPath} from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __configDirname = path.dirname(__filename);

const rootDirectory = path.resolve(__configDirname, '../');

export {__configDirname, rootDirectory};

export const isMainModule =
	path.resolve(process.argv[1]) === path.resolve(`${rootDirectory}/app.js`);

export const confirmDirectoryExists = (dirPath) => {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, {recursive: true});
	}
};
