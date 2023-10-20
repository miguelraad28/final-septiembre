import { Schema } from 'mongoose'
import { ManagerMongoose } from '../ManagerMongoose.js'

export const tokenManagerMongo = new ManagerMongoose('tokens', {
  idUser : String,
  token: String
})


