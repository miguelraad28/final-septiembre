import { UnauthorizedError } from "../errors/errors.js"

export function autenticacion(req, res, next){
    req.logger.info("pasa por autenticación")
    if(!req.user){ 
        req.logger.error(new UnauthorizedError())
        next(new UnauthorizedError())
    }else{
        next()
    }
}