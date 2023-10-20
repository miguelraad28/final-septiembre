import { ForbiddenError } from "../errors/errors.js"

export function auth(roles){
    return function(req, res, next){
        if(roles.includes(req.user.rol)){
            req.logger.info("pasa por auth")
            next()
        } else{
            req.logger.error(new ForbiddenError())
            next(new ForbiddenError())
        }
    }
}