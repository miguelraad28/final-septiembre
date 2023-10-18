export async function chatController(req, res, next) {
    try {
        res.render('chat', {
            esUser: req.user.rol == "user" ? true : false,
            titulo: 'Chat',
            loggedIn: true,
            cartId: req.user.cart
        });
    } catch (error) {
        res.send('error:' + JSON.stringify(error));
    }
}
