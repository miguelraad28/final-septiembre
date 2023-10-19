import { Router } from 'express'
import { deleteOneController, deleteUserController, getUsersController, postMulterUserController, postUserController, putPasswordUsersController, putRolFromAdminUserController, putRolUserController } from '../../controllers/api/users.controllers.js'
import { multerMiddleware } from '../../middlewares/multer.js'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { auth } from '../../middlewares/auth.js'

export const usersRouter = Router()

usersRouter.get('/', getUsersController)
usersRouter.post('/', postUserController)
usersRouter.put('/:token', putPasswordUsersController)
usersRouter.put('/rol/:uid', auth(["admin"]), putRolFromAdminUserController)
usersRouter.delete('/delete/:uid', auth(["admin"]), deleteOneController)
usersRouter.get('/premium/:uid', putRolUserController)

usersRouter.post('/:uid/documents', 
multerMiddleware.fields([
  { name: 'identificacion', maxCount: 1 },
  { name: 'domicilio', maxCount: 1 },
  { name: 'estadoDeCuenta', maxCount: 1 },
]),
postMulterUserController)

usersRouter.delete('/twodays', autenticacion, auth(["admin"]),deleteUserController)
