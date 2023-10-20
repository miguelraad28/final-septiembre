import { UnauthorizedError } from "../errors/errors.js"

// export function autenticacion(req, res, next){
//     if(!req.user){ 
//         req.logger.error(new UnauthorizedError())
//         next(new UnauthorizedError())
//     }else{
//         next()
//     }
// }
export function autenticacion(req, res, next) {
    if (!req.user) {
        req.logger.error(new UnauthorizedError())
        return res.status(401).render('errors/errors', {
        title: 'Error',
        h1: 'Acceso no autorizado',
        message: 'Debe iniciar sesión para acceder a esta página.'
        })
    } else {
        next()
    }
}