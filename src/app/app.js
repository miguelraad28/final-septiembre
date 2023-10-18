import express from 'express'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
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


app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(multerMiddleware.single("image"))


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


app.use((error, req, res, next) => {
    if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof InvalidArgumentError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof UnauthorizedError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof ForbiddenError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof InvalidIntegerError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof InvalidNumberError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof InvalidStringError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof EmptyFieldError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof InvalidFormatError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof InvalidLengthError) {
        res.status(error.statusCode).json({ error: error.message })
    } else if (error instanceof UserExistsError) {
        res.status(error.statusCode).json({ error: error.message })
    } else {
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})



app.use('/api', apiRouter)
app.use('/', webRouter)


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




