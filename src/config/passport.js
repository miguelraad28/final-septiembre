import dotenv from 'dotenv';
dotenv.config();

export const githubCallbackUrl = process.env.GITHUBCALLBACKURL
export const githubClientId = process.env.GITHUBCLIENTEID
export const githubClientSecret = process.env.GITHUBCLIENTSECRET

export const adminEmail = process.env.ADMIN_EMAIL
export const adminPassword = process.env.ADMIN_PASSWORD


