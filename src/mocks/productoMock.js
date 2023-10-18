import { faker } from "@faker-js/faker"
import { Product } from "../models/Product.js"

export default function crearProductoMock(){
  return new Product({
    title : faker.commerce.productName(), 
    description : faker.commerce.productDescription(), 
    price : faker.number.int({ min: 1, max: 1000 }), 
    thumbnail : faker.system.commonFileName("jpg"),
    code : faker.string.alpha({ length: 6, casing: 'upper'}),
    stock : faker.number.int({ min: 1, max: 100 }),
    owner: "admin"
  })  
}

