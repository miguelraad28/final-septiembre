import { Router } from 'express'
import { cartPostController, 
        cartPutController,
        cartsGetController,
        cartsDeleteProductsController,
        cartConUserPutController,
        cartFinalizarCompra,
        cartMostrarOrders} from '../../controllers/api/cart.controllers.js'
import {autenticacion} from '../../middlewares/autenticacion.js'
export const cartRouter = Router()

// POST

cartRouter.post('/', cartPostController) // crear carrito


//PUT

// listo     PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
cartRouter.put('/:cid', cartPutController) // cargar productos o modificar carrito
// listo     PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartRouter.put('/:cid/products/:pid', cartPutController) // cargar productos o modificar carrito

cartRouter.put('/', cartConUserPutController)

// Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.
cartRouter.post('/:cid/purchase', cartFinalizarCompra)
cartRouter.get('/:cid/purchase',autenticacion ,cartMostrarOrders)



//GET

// listo      Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
cartRouter.get('/:cid', cartsGetController) // ver  un carrito
// listo        Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. 
cartRouter.get('/', cartsGetController) // ver todos los carritos




//DELETE

// listo     DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
cartRouter.delete('/:cid/products/:pid', cartsDeleteProductsController)
// listo    DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
cartRouter.delete('/:cid/', cartsDeleteProductsController)





