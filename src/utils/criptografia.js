import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'


export function hashear(frase) {
    return bcrypt.hashSync(frase, bcrypt.genSaltSync(10))
}

export function validarQueSeanIguales(recibida, almacenada) {
    return bcrypt.compareSync(recibida, almacenada)
}

export function generarToken(dato, ttl = '24h') {
    return jwt.sign({ dato }, JWT_SECRET, { expiresIn: ttl })
}

export function decodificarToken(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        return payload['dato']
    } catch (error) {
        throw new Error('error de autenticacion: sesión expirada')
    }
}


