import { Router } from 'express'
import { getUsersController, postMulterUserController, postUserController, putPasswordUsersController } from '../../controllers/api/users.controllers.js'
import { multerMiddleware } from '../../middlewares/multer.js'

export const usersRouter = Router()

usersRouter.get('/', getUsersController)
usersRouter.post('/', postUserController)
usersRouter.put('/:token', putPasswordUsersController)
usersRouter.put('/premium/:uid', )

usersRouter.post('/:uid/documents', 
multerMiddleware.fields([
  { name: 'identificacion', maxCount: 1 },
  { name: 'domicilio', maxCount: 1 },
  { name: 'estadoDeCuenta', maxCount: 1 },
]),
postMulterUserController)
