import { Router } from 'express'
import { getUsersController, postMulterUserController, postUserController, putPasswordUsersController } from '../../controllers/api/users.controllers.js'

export const usersRouter = Router()

usersRouter.get('/', getUsersController)
usersRouter.post('/', postUserController)
usersRouter.put('/:token', putPasswordUsersController)
usersRouter.put('/premium/:uid', )
usersRouter.post('/:uid/documents', postMulterUserController)
