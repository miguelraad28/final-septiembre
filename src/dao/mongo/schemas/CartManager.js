import { Schema } from 'mongoose'
import { ManagerMongoose } from '../ManagerMongoose.js'

export const cartManagerMongo = new ManagerMongoose('carts', {
    listProducts: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            foreignField: '_id',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        }
    }]
})


