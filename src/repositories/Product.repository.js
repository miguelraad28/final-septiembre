import { Product } from "../models/Product.js";

export default class ProductRepository{
    constructor(persistence){
        this.persistence = persistence
    }

    async registrar(product) {
        let productToInsert = new Product(product)
        return await this.persistence.create(productToInsert)
    }

    async read(filter){
        return await this.persistence.read(filter)
    }

    async update(filter, updatedData){
        return await this.persistence.update(filter, updatedData)
    }

    async delete(filter){
        return await this.persistence.delete(filter)
    }

    async getIdByProperty(property, value){
        return await this.persistence.getIdByProperty(property,value)
    }

    async paginate(filter, options){
        return await this.persistence.paginate(filter, options)
    }
    async checkStock(products) {
        let withStock = [];
        let outOfStock = [];
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (product.productId.stock < product.quantity) {
                    outOfStock.push({
                        productId: product.productId._id,
                        quantity: product.quantity,
                    })
                } else {
                    const updatedStock = product.productId.stock -= product.quantity
                    await this.persistence.update(product.productId._id, { stock: updatedStock});
                    withStock.push({
                    productId: product.productId._id,
                    quantity: product.quantity
                })
            }
        }
        return {withStock,outOfStock
        }
    }
}