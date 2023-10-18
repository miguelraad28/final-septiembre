import { Router } from 'express'
import { loggerGetController } from '../../controllers/api/logger.controller.js'

export const loggerRouter = Router()


loggerRouter.get('/', loggerGetController)