import { ManagerMongoose } from '../ManagerMongoose.js'

export const userManagerMongo = new ManagerMongoose('users', {
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    cart: String,
    rol: String,
    documents: [{
        name: {
            type: String,
            required: true
        },
        reference: {
            type: String,
            required: true
        }
    }],
    last_connection : {type: Date}
})
