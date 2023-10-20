import { userRepository } from "../../repositories/index.js"
import { userService } from "../../services/user.service.js"

export async function postUserController(req, res, next) {
    try {
        console.log(req.body)
        await userService.create(req.body)
        res.sendStatus(201)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function getUsersController(req, res, next) {
    try {
        const users = await userRepository.readDTO({})
        res.status(200).json(users)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
    
}

export async function putPasswordUsersController(req,res,next){
    try {
        const token = req.params.token
        const filter = {email: req.body.email}
        const dataToUpdate = req.body
        const updated = await userService.updatePassword(filter, dataToUpdate, token)
        res.status(200).json(updated)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function putRolUserController(req,res,next){
    try {
        const filter = {_id: req.params.uid}
        const dataToUpdate = {rol: "user"}
        const updated = await userService.rolUpdate(filter, dataToUpdate)
        res.status(200).json(updated)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}
export async function putRolFromAdminUserController(req,res,next){
    try {
        const filter = {_id: req.params.uid}
        const user = await userRepository.readDTO(filter)
        let dataToUpdate
        if(user.rol == "user"){dataToUpdate = {rol: "premium"}}
        else{dataToUpdate = {rol: "user"}}
        await userRepository.update(filter, dataToUpdate)
        res.status(200)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function postMulterUserController(req, res, next) {
    try {
        const uid = req.params.uid
        const filter = {_id: uid}
        await userService.documentsUpdate(filter, req.files)
        const updated = await userRepository.readDTO(filter)
        req.login(updated, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/profile');
        })
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}

export async function deleteUserController(req, res, next) {
    try {
        await userService.deletetwoDaysAgo()
        res.sendStatus(200)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}

export async function deleteOneController(req, res, next) {
    try {
        const filter = {_id: req.params.uid}
        await userRepository.deleteOne(filter)
        res.sendStatus(200)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}