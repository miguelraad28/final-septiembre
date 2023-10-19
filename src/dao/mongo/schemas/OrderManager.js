// import { Schema } from 'mongoose';
// import { ManagerMongoose } from '../ManagerMongoose.js';

// const productSchema = new Schema({
//     _id: { type: Schema.Types.ObjectId, ref: 'products' }, // Definir el campo _id como ObjectId
//     cantidad: { type: Number, required: true, min: 1 },
// })

// export const orderManagerMongo = new ManagerMongoose('orders', {
//     code: { type: String, required: true },
//     purchase_dateTime: { type: Date, required: true }, // Usar Date en lugar de String para purchase_dateTime
//     amount: { type: Number, required: true },
//     purchaser: { type: String, required: true },
//     listProducts: [productSchema], // Usar el esquema productSchema dentro de listProducts
// })

import { Schema } from 'mongoose';
import { ManagerMongoose } from '../ManagerMongoose.js';

const productSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1,
    },
});


export const orderManagerMongo = new ManagerMongoose('orders', {
    code: { type: String, required: true },
    purchase_dateTime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    listProducts: [productSchema], // Aquí especificamos el array de subdocumentos
});
