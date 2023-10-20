import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import exphbs from 'express-handlebars';
import { Server } from 'socket.io'
import session from 'express-session'
import MongoStore from 'connect-mongo'



import { PORT } from '../config/servidor.js'
import { MONGODB_CNX_STR } from '../config/mogodb.js'
import { apiRouter } from '../routers/api/api.router.js'
import { webRouter } from '../routers/web/web.router.js'
import { configureMessagesSocket } from '../sockets/messages.socket.js'
import { agregarAlCarritoSocket } from '../sockets/agregrarAlCarrito.socket.js'
import { passportInitialize, passportSession } from '../middlewares/passport.js'
import { EmptyFieldError, ForbiddenError, InvalidArgumentError, InvalidFormatError, InvalidIntegerError, InvalidLengthError, InvalidNumberError, InvalidStringError, NotFoundError, UnauthorizedError, UserExistsError } from '../errors/errors.js'
import { winstonLogger } from '../utils/logger.js'
import { logger } from '../middlewares/logger.js'
import { multerMiddleware } from '../middlewares/multer.js'

export const app = express()


const hbs = exphbs.create()
hbs.handlebars.registerHelper('reverse', function (array) {
    return array.slice().reverse();
})
hbs.handlebars.registerHelper('hasDocument', function hasDocument(documents, documentType) {
    return documents.some(doc => doc.documento === documentType)
})
hbs.handlebars.registerHelper('isLastConnectionOld', function (last_connection) {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    return new Date(last_connection) < twoDaysAgo;
});

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
//app.use(multerMiddleware.single("image"))
//app.use(multerMiddleware.array("image"))

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGODB_CNX_STR,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 180
    }),
    secret: 'secretcode',
    resave: false,
    saveUninitialized: false
}))


app.use(passportInitialize, passportSession)

app.use(logger)

app.use('/api', apiRouter)
app.use('/', webRouter)

// app.use((error, req, res, next) => {
//     let h1, message;

//     if (error instanceof NotFoundError) {
//         h1 = 'Error 404 - Recurso no encontrado'
//         message = error.message;
//     } else if (error instanceof UnauthorizedError) {
//         h1 = 'Error de Autorización'
//         message = error.message;
//     } else if (error instanceof ForbiddenError) {
//         h1 = 'Error de Prohibición'
//         message = error.message;
//     } else if (error instanceof InvalidArgumentError || 
//                 error instanceof InvalidIntegerError || 
//                 error instanceof InvalidNumberError || 
//                 error instanceof InvalidStringError || 
//                 error instanceof EmptyFieldError || 
//                 error instanceof InvalidFormatError || 
//                 error instanceof InvalidLengthError || 
//                 error instanceof UserExistsError) {
//         h1 = 'Error de Validación'
//         message = error.message
//     } else {
//         h1 = 'Error Interno del Servidor'
//         message = 'Ha ocurrido un error interno en el servidor.'
//     }
//     res.status(error.statusCode || 500).render('error', { title: "Error", h1, message });
// })






await mongoose.connect(MONGODB_CNX_STR)


const servidor = app.listen(PORT, '0.0.0.0', () => {
    winstonLogger.info(`escuchando en ${servidor.address().port}`)
})

const io = new Server(servidor)

io.on('connection', socket => {
    winstonLogger.info('nuevo socket conectado')
    configureMessagesSocket(io, socket)
    agregarAlCarritoSocket(io, socket)
})




