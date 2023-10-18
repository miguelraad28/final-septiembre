import { ManagerMongoose } from '../ManagerMongoose.js'

export const productsManagerMongo = new ManagerMongoose('products', {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    owner: { type: String, required: true },
})
