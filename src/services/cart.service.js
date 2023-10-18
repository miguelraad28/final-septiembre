
import { productRepository,} from "../repositories/index.js";


class CartService {
    async checkOwner(user, idDelProducto) {
      const producto = await productRepository.read({_id : idDelProducto})
      if(producto.owner == user._id){
        throw new Error("No se pueden agregar al carrito productos creados por ud mismo")
      }
    }
}

export const cartService = new CartService()

