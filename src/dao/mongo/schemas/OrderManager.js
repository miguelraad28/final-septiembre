import { Schema } from 'mongoose'
import { ManagerMongoose } from '../ManagerMongoose.js'

const productSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
})


export const orderManagerMongo = new ManagerMongoose('orders', {
    code: { type: String, required: true },
    purchase_dateTime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    listProducts: [productSchema], // Aquí especificamos el array de subdocumentos
})
