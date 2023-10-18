import { Schema } from 'mongoose'
import { ManagerMongoose } from '../ManagerMongoose.js'

export const tokenManagerMongo = new ManagerMongoose('tokens', {
  idUsuario : String,
  token: String
})


