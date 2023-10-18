import { NotFoundError } from '../../errors/errors.js';
import { cartRepository } from '../../repositories/index.js'

export async function cartsGetController(req, res) {
    try {
        const criterioDeBusqueda = {"_id" :req.params.cid} || {};
        const carts = await cartRepository.showCart(criterioDeBusqueda);
        res.render('carts', {
            esUser: req.user.rol == "user" ? true : false,
            sonVarios: carts.length > 1 ? true : false ,
            carts: carts,
            titulo: 'Carts',
            loggedIn: true,
            cartId: req.user.cart
        });
    } catch (error) {
        res.send('error:' + JSON.stringify(error));
    }
}

