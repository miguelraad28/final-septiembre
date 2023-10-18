import { ManagerMongoose } from '../ManagerMongoose.js'

export const orderManagerMongo = new ManagerMongoose('orders', {
    code: { type: Number, required: true },
    purchase_dateTime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser : { type: String, required: true }
})

