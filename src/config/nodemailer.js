import env from './environment.js'
import nodemailer from 'nodemailer'

const {GOOGLE_EMAIL, GOOGLE_PASS, PORT} = env

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	port: 587,
	auth: {user: GOOGLE_EMAIL, pass: GOOGLE_PASS,}
})

export const sendEmailToResetPass = (email, token) => ({
	from: GOOGLE_EMAIL,
	to: email,
	subject: 'Password Reset',
    html: `<html>
    <head>
        <title>Password Reset</title>
    </head>
    <body>
        <h1>Hi there,</h1>
        <p>This email is sent to you because you have requested a password reset for your account.</p>
        <p>To complete the process, please click on the following link or copy and paste it into your web browser:</p>
        <a href="http://localhost:${PORT}/api/users/reset-password?token=${token}&email=${email}">Reset Password</a>
        <p>This link will expire in one hour.</p>
        <p>If you did not make this request, please disregard this email, and your password will remain unchanged.</p>
    </body>
    </html>`
})

export const sendEmailDeletedAccount = user => ({
	from: GOOGLE_EMAIL,
	to: user.email,
	subject: 'Account Deletion Notice',
	html: `<html>
    <head>
        <title>Account Deletion</title>
    </head>
    <body>
        <h1>Hi ${user.first_name},</h1>
        <p>Your account has been removed due to prolonged inactivity.</p>
        <p>If you'd like to resume using our services, you'll need to register again.</p>
    </body>
    </html>`
})

export const sendEmailProductDeleted = (user, id) => ({
	from: GOOGLE_EMAIL,
	to: user.email,
	subject: 'Product Deletion Notice',
    html: `<html>
    <head>
        <title>Product Deletion</title>
    </head>
    <body>
        <h1>Hi ${user.first_name},</h1>
        <p>We regret to inform you that one of your products has been deleted.</p>
        <p>If this is an error, please contact support with the relevant details.</p>
    </body>
    </html>`
})
