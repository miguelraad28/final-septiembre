import { NotFoundError } from "../errors/errors.js"

export default class CartRepository {
    constructor(persistence) {
        this.persistence = persistence
    }

    async createCart(record) {
        const cart = await this.persistence.create(record)
        //devuelvo solo el id
        const cartId = cart._id
        return cartId
    }

    async showCart(filter) {
        const result = await this.persistence.readAndPopulate(filter)
        if(result.length <= 0) {
            throw new NotFoundError()}
        return result
    }

    async updateCart(filter, updatedData) {
        return await this.persistence.update(filter, updatedData)
    }

    async addProductToCart(cartId, product) {
        const { _id, cant } = product;

        // Verificar si el carrito existe
        const cart = await this.showCart({ _id: cartId });
        if (!cart) {
            throw new NotFoundError()
        }
        // Verificar si el producto ya está en el carrito
        const existingProductIndex = cart[0].listProducts.findIndex(p => p.productId.toString() === _id);
        if (existingProductIndex !== -1) {
            // El producto existe en el carrito, incrementar la cantidad
            cart.listProducts[existingProductIndex].cantidad += cant;
        } else {
            // El producto no existe en el carrito, agregarlo
            cart[0].listProducts.push({
                productId: _id,
                cantidad: cant
            });
        }
        // Actualizar el carrito en la base de datos
        const filter = { _id: cartId };
        const updatedData = { listProducts: cart[0].listProducts };
        return await this.persistence.update(filter, updatedData);
    }

    async removeProducts(idDelcarrito, productosAEliminar) {
        // Buscar el carrito en la base de datos
        const cart = await this.showCart({ _id: idDelcarrito });
        // Filtrar los productos a eliminar del carrito
        const updatedProducts = cart[0].listProducts.filter(product => !productosAEliminar.includes(product.productId._id.toString()));
        // Actualizar el carrito con los productos actualizados
        const updatedCart = await this.persistence.update({ _id: idDelcarrito }, { listProducts: updatedProducts });
        return updatedCart;
    }

}