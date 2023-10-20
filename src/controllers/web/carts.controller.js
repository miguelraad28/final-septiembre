import { cartRepository } from '../../repositories/index.js'

export async function cartsGetController(req, res) {
    try {
        const criteria = {_id :req.params.cid}
        const cart = await cartRepository.showCart(criteria)
        res.render('carts', {
            cart: cart[0],
            titulo: 'Cart',
            loggedIn: true,
            cartId: req.user.cart,
            user: req.user
        });
    } catch (error) {
        res.send('error:' + JSON.stringify(error))
    }
}

