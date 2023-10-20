import { userRepository } from "../../repositories/index.js"


export function getCurrentSessionController(req, res, next) {
    res.json(req.user)
}

export async function logoutSessionsController(req, res, next) {
    if(req.user.rol != "admin"){
        const filter = {_id: req.user}
        const dataToUpdate = {last_connection: new Date()}
        await userRepository.update(filter, dataToUpdate)
    }
    req.logout(err => {
        res.sendStatus(200)
    })
}

export async function postSessionsController(req, res, next) {
    if(req.user.rol != "admin"){
        const filter = {_id: req.user}
        const dataToUpdate = {last_connection: new Date()}
        await userRepository.update(filter, dataToUpdate)
    }
    res.status(201).json(req.user)
}