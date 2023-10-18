import winston from 'winston'
import { loggerEnv } from '../config/config.js'

const levels = {
  fatal : 0,
  error : 1,
  warning : 2,
  info : 3,
  http : 4,
  debug: 5
} 

let transports = []

if (loggerEnv === "desarrollo"){
  transports = [
    new winston.transports.Console({
      level : "debug"
    })
  ]
} else if (loggerEnv === "produccion"){
  transports = [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      level: "error",
      filename: "errors.log"
    })
  ]
}

export const winstonLogger = winston.createLogger({
  levels, transports
})



