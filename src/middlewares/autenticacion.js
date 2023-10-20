import { UnauthorizedError } from "../errors/errors.js"

export function autenticacion(req, res, next){
    if(!req.user){ 
        req.logger.error(new UnauthorizedError())
        next(new UnauthorizedError())
    }else{
        next()
    }
}