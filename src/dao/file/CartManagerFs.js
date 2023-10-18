import Cart from "./models/Cart.js";
import { readFile, writeFile } from "fs/promises";
class CartManager {
    _carts
    _path
    constructor(_path) {
        this._carts = []
        this._path = _path
    }
    async newCart() {
        try {
            const data = await readFile(this._path, "utf-8")
            //  si la collection NO esta VACIA traemos los datos.
            if (data !== "") this._carts = JSON.parse(data)
            const cart = new Cart();
            this._carts.push(cart);
            await writeFile(this._path, JSON.stringify(this._carts));
            return ({ message: "Carrito creado", cart: cart });
        } catch (error) {
            console.error(error);
        }
    }
    async getCartById(id) {
        try {
            const data = await readFile(this._path, 'utf-8')
            this._carts = JSON.parse(data)
            const cart = this._carts.find(_cart => _cart.id === id)
            if (cart) {
                return cart.products
            } else {
                return ({ message: "El carrito que buscas no existe", pending: true })
            }
        } catch (error) {
            console.error(error)
        }
    }
    async addProductToCart(cid, pid) {
        try {
            const data = await readFile(this._path, 'utf-8')
            this._carts = JSON.parse(data)
            
            const _cart = this._carts.find(_cart => _cart.id === cid)
            const newValues = this._carts.find(_cart => _cart.id === cid)
            if(_cart.products.find(product => product.id === pid)){
                const productToAdd = newValues.products.find(product => product.id === pid)
                
                productToAdd.quantity = ++productToAdd.quantity
                
                Object.assign(_cart, newValues)
                await writeFile(this._path, JSON.stringify(this._carts))
            }else{
                const newProductToAdd = {
                    id: pid,
                    quantity: 1
                }
                newValues.products.push(newProductToAdd)
                Object.assign(_cart, newValues)
                await writeFile(this._path, JSON.stringify(this._carts))
            }
            return ({ message: "Carrito actualizado", cart: _cart })
        } catch (error) {
            console.error(error)
        }
    }
}
const cartsController = new CartManager("./src/database/carts.json")

export { cartsController };