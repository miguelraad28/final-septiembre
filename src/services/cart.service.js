
import { productRepository,} from "../repositories/index.js";


class CartService {
    async checkOwner(idUser, idDelProducto) {
      const filter = {_id: idDelProducto}
      const producto = await productRepository.read(filter)
      if(producto.owner == idUser){
        throw new Error("No se pueden agregar al carrito productos creados por ud mismo")
      }
    }
}

export const cartService = new CartService()

