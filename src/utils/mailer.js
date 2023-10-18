import { createTransport } from 'nodemailer'
import { EMAIL_CONFIG } from '../config/config.js'
import { winstonLogger } from './logger.js'

class Mailer {

    constructor(config) {
        this.clienteNodemailer = createTransport(config)
    }

    async send(destinatario, asunto, mensaje) {
        const mailOptions = {
            from: 'Enviador de mails',
            to: destinatario,
            subject: asunto,
            html: mensaje,
        }

        try {
            const info = await this.clienteNodemailer.sendMail(mailOptions)
            winstonLogger.info(info)
            return info
        } catch (error) {
            winstonLogger.error(error)
            throw error
        }
    }
}

export const mailer = new Mailer(EMAIL_CONFIG)