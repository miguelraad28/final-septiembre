import winston from 'winston'

const levels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	http: 4,
	debug: 5
}

const colors = {
	fatal: 'magenta',
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	http: 'green',
	debug: 'blue'
}

winston.addColors(colors)

const transports = [
	new winston.transports.File({
		filename: './errors.log',
		level: 'error',
		format: format,
	}),
]

const format = winston.format.combine(
	winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
	winston.format.printf(
		info => `${info.timestamp} ${info.level} - ${info.message}`,
	),
)


if (process.env.NODE_ENV !== 'PROD') {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize({all: true}),
				format,
			),
			level: 'debug',
		}),
	)
} else {
	transports.push(
		new winston.transports.Console({
			format: format,
			level: 'info',
		}),
	)
}

export const winstonLogger = winston.createLogger({
	levels: levels,
	format: format,
	transports: transports,
})
