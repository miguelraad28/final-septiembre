import { ManagerMongoose } from '../ManagerMongoose.js'

export const userManagerMongo = new ManagerMongoose('users', {
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password: String,
    cart: String,
    rol: String,
    documents: [{
        documento:{
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        reference: {
            type: String,
            required: true
        }
    }],
    last_connection : {type: Date},
    status: Boolean
})
