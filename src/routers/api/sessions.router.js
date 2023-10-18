import { Router } from 'express'
import {postSessionsController,logoutSessionsController, getCurrentSessionController} from '../../controllers/api/sessions.controllers.js'
import { autenticacionPorGithub_CB, autenticacionPorGithub, autenticacionUserPass } from '../../middlewares/passport.js'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { auth } from '../../middlewares/auth.js'

export const sessionsRouter = Router()

// login local

sessionsRouter.post('/', autenticacionUserPass, postSessionsController)

// login con github
sessionsRouter.get('/github', autenticacionPorGithub)
sessionsRouter.get('/githubcallback', autenticacionPorGithub_CB, (req, res, next) => { res.redirect('/products') })

// logout
sessionsRouter.get('/logout', logoutSessionsController)

// datos de sesion, para testear!
sessionsRouter.get('/current',autenticacion, auth(["admin","user"]), getCurrentSessionController)