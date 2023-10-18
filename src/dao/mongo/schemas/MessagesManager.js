import { ManagerMongoose } from '../ManagerMongoose.js'

export const messagesManagerMongo = new ManagerMongoose('messages', {
    alias: { type: String, required: true },
    message: { type: String, required: true },
})