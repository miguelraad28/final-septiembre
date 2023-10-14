import { isMainModule, rootDirectory } from './config/dirname.js';
import express from "express";
import enviroment from './config/environment.js';
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import path from "node:path";
// Passport
import iniPassport from './config/passport.js';
import passport from 'passport';
import {configureSession} from './config/session.js';
// Routers
import {initializeViewsRoutes} from "./routes/views.routes.js"
import { initializeAuthRoutes } from './routes/auth.routes.js';

const { PORT } = enviroment
export const initializeApp = async () => {

    const app = express()


    // Server config
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Passport config
    iniPassport();
	app.use(configureSession());
	app.use(passport.initialize());
	app.use(passport.session());

    // Handlebars
    app.engine('handlebars', handlebars.engine());
    app.set('views', path.join(rootDirectory, 'views'));
    app.set('view engine', 'handlebars');

    // Files
    app.use(express.static(path.join(rootDirectory, 'public')));

    // Routers
    const viewsRouter = await initializeViewsRoutes()
    const authRouter = await initializeAuthRoutes();

    // Route setup
    app.use('/', viewsRouter);
    app.use('/api/users', authRouter);

    // Routes
    app.use("/", viewsRouter)

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
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`Failed to start server: ${error}`);
    }
};
if (isMainModule) {
    startServer();
}