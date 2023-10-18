import dotenv from 'dotenv';
dotenv.config();


export const persistenciaEnv = process.env.PERCISTENCE

//mailer

export const EMAIL_CONFIG = {
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAILMAILER,
    pass: process.env.PASSMAILER
  }
}

//logger

export const loggerEnv = process.env.LOGGER

//JWT

export const JWT_SECRET = "S3CTR3T"
