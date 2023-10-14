import {confirmDirectoryExists} from '../config/dirname.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let folder;
		switch (req.body.type) {
			case 'profile':
				folder = 'profiles';
				break;
			case 'product':
				folder = 'products';
				break;
			default:
				folder = 'documents';
		}

		const dirPath = path.join('./uploads', folder);

		confirmDirectoryExists(dirPath);

		cb(null, dirPath);
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

export const uploadMiddleware = multer({storage: storage}).array('documents');
