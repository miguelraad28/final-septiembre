import express from "express";
import enviroment from './config/enviroment.config.js';
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import path from "node:path";
import {fileURLToPath} from 'url';

const {PORT} = enviroment

export const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {
    res.send("UP")
})


app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
