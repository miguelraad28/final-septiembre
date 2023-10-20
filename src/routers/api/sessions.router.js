import { Router } from 'express'
import {postSessionsController,logoutSessionsController, getCurrentSessionController} from '../../controllers/api/sessions.controllers.js'
import { autenticationPorGithub_CB, autenticationPorGithub, autenticationUserPass } from '../../middlewares/passport.js'
import { autentication } from '../../middlewares/autentication.js'
import { auth } from '../../middlewares/auth.js'

export const sessionsRouter = Router()

// login local

sessionsRouter.post('/', autenticationUserPass, postSessionsController)

// login con github
sessionsRouter.get('/github', autenticationPorGithub)
sessionsRouter.get('/githubcallback', autenticationPorGithub_CB, (req, res, next) => { res.redirect('/products') })

// logout
sessionsRouter.get('/logout', logoutSessionsController)

// datos de sesion, para testear!
sessionsRouter.get('/current',autentication, auth(["admin","user"]), getCurrentSessionController)