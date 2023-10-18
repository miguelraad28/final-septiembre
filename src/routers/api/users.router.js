import { Router } from 'express'
import { deleteUserController, getUsersController, postMulterUserController, postUserController, putPasswordUsersController, putRolUserController } from '../../controllers/api/users.controllers.js'
import { multerMiddleware } from '../../middlewares/multer.js'

export const usersRouter = Router()

usersRouter.get('/', getUsersController)
usersRouter.post('/', postUserController)
usersRouter.put('/:token', putPasswordUsersController)
//usersRouter.put('/premium/:uid', putRolUserController)
usersRouter.get('/premium/:uid', putRolUserController)

usersRouter.post('/:uid/documents', 
multerMiddleware.fields([
  { name: 'identificacion', maxCount: 1 },
  { name: 'domicilio', maxCount: 1 },
  { name: 'estadoDeCuenta', maxCount: 1 },
]),
postMulterUserController)

usersRouter.delete('/', deleteUserController)
