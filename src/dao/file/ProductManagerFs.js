import { NotFoundError } from "../../errors/errors.js";
import Product from "./models/Product.js";
import { readFile, writeFile } from "fs/promises";
class ProductManagerFS {
    _products
    _path
    constructor(_path) {
        this._products = []
        this._path = _path
    }
    async addProduct(newProduct) {
        const {title, description, price, thumbnail, code, stock, status} = newProduct
        try {
            const data = await readFile(this._path, "utf-8")
            //  si la collection NO esta VACIA traemos los datos.
            if (data !== "") this._products = JSON.parse(data)
            if (this._products.find(_product => _product.code === newProduct.code)) {
                return ({message:"Ya existe un producto con este código.", pending: true});
            }else if(title === undefined || description === undefined || code === undefined || stock === undefined){
                return({message: "Todos los campos (Menos status y thumbnail) son OBLIGATORIOS", pending: true})
            }else {
                const product = new Product(title, description, price, thumbnail, code, stock, status);
                this._products.push(product);
                await writeFile(this._path, JSON.stringify(this._products));
                return ({message:"Producto creado", product: product});
            }
        } catch (error) {
            console.error(error);
        }
    }

    // READ
    async getProducts(limit = null) {
        try {
            if(limit){
                this._products = JSON.parse(await readFile(this._path, 'utf-8'))
                const productsWithLimitQuery = this._products.slice(0, Number(limit))
                return (productsWithLimitQuery)
            }else{
                this._products = await readFile(this._path, 'utf-8')
                return JSON.parse(this._products)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // READ
    async getProductById(id) {
        try {
            const data = await readFile(this._path, 'utf-8')
            this._products = JSON.parse(data)
            const product = this._products.find(_product => _product.id === id)
            if (product) {
                return product
            } else {
                return ({message:"El producto que buscas con ese ID, no existe.", pending: true})
            }
        } catch (error) {
            console.error(error)
        }
    }

    // UPDATE
    async updateProduct(id, newValues) {
        try {
            const data = await readFile(this._path, 'utf-8');
            this._products = JSON.parse(data)
            if (this._products.findIndex(_product => _product.id === id) === -1) {
                throw new NotFoundError()
            }
            const _product = this._products.find(_product => _product.id === id)
            const productUpdated = Object.assign(_product, newValues)
            await writeFile(this._path, JSON.stringify(this._products))
            return ({message: "Producto actualizado", product: productUpdated})
        } catch (error) {
            console.error(error)
        }
    }

    // DELETE
    async deleteProduct(id) {
        try {
            const data = await readFile(this._path, 'utf-8')
            const products = JSON.parse(data)
            const productIndex = products.findIndex((product) => product.id === id)
            if (productIndex === -1) {
                return({message: "El producto con ese ID no fue encontrado", pending: true})
            }
            products.splice(productIndex, 1)
            await writeFile(this._path, JSON.stringify(products))
            return({message: "Producto Eliminado"})
        } catch (error) {
            console.error(error)
        }
    }

}
const productsManagerFile = new ProductManagerFS("./src/database/products.json")

export {productsManagerFile};