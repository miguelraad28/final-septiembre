import express from "express";
import enviroment from './config/enviroment.config.js';
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import path from "node:path";
import { fileURLToPath } from 'url';

const { PORT } = enviroment
export const initializeApp = async () => {

    const app = express()

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Server config
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Handlebars
    app.engine('handlebars', handlebars.engine());
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'handlebars');

    // Files
    app.use(express.static(path.join(__dirname, 'public')));

    // Routes
    app.get("/", (req, res) => {
        return res.render("home", { userIsLoggedIn: true })
    })
    // Not found page
    app.get("*", (req, res) => {
        return res.render("notFound")
    })


    return app
}
const startServer = async () => {
	try {
		const app = await initializeApp();
		app.listen(PORT, () => {
			logger.info(`Server listening at http://localhost:${PORT}`);
		});
	} catch (error) {
		logger.error(`Failed to start server: ${error}`);
	}
};
if (isMainModule) {
	startServer();
}