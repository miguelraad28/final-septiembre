import { userRepository } from "../../repositories/index.js"


export function getCurrentSessionController(req, res, next) {
    res.json(req.user)
    
}

export async function logoutSessionsController(req, res, next) {
    const filter = {_id: req.user}
    const datosAActualizar = {last_connection: new Date()}
    await userRepository.update(filter, datosAActualizar)
    req.logout(err => {
        res.sendStatus(200)
    })
}

export async function postSessionsController(req, res, next) {
    const filter = {_id: req.user}
    const datosAActualizar = {last_connection: new Date()}
    await userRepository.update(filter, datosAActualizar)
    res.status(201).json(req.user)
}