import {rootDirectory} from './dirname.js'
import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
	definition: {
		openapi: '1.0.0',
		info: {
			title: 'DOCS',
			description: "This is the final project for a Coderhouse backend course.",
		},
	},
	apis: [`${rootDirectory}/docs/**/*.yaml`],
};
export const specs = swaggerJSDoc(swaggerOptions)
