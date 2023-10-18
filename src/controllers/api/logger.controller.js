import { winstonLogger } from "../../utils/logger.js"

export function loggerGetController(req, res) {
    winstonLogger.fatal('Este es un mensaje de algo FATAL');
    winstonLogger.error('Este es un mensaje de error');
    winstonLogger.warning('Este es un mensaje de advertencia');
    winstonLogger.info('Este es un mensaje de información');
    winstonLogger.http('Este es un mensaje con info de peticiones');
    winstonLogger.debug('Este es un mensaje para debug');
    res.sendStatus(200);
}