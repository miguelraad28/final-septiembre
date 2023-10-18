import { Router } from 'express'
import { postTokenController } from '../../controllers/api/token.controller.js'

export const tokenRouter = Router()

tokenRouter.post('/', postTokenController)
