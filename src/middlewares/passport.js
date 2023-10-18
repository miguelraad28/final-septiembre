import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { validarQueSeanIguales } from '../utils/criptografia.js';
import { adminEmail, adminPassword, githubCallbackUrl, githubClientId, githubClientSecret } from '../config/passport.js';
import { userRepository } from '../repositories/index.js';



passport.use('login', new Strategy({usernameField: "email"}, async (email, password, done) => {
    const user = await userRepository.read({"email": email})
    if (user.length <= 0 ) {
        if (email === adminEmail && password === adminPassword) {
            const adminUser = {
                email: email,
                rol: 'admin'
            }
            return done(null, adminUser)
        } else {
            return done(null, false, { message: 'Nombre de usuario o contraseña incorrectos.' })
        }
    }
    if (!validarQueSeanIguales(password, user["password"]))
        return done(null, false, { message: 'Nombre de usuario o contraseña incorrectos.' })
    delete user.password
    done(null, user)
}))


passport.use('github', new GithubStrategy({
    clientID: githubClientId,
    clientSecret: githubClientSecret,
    callbackURL: githubCallbackUrl,
    scope: [ 'read:user' ]
}, async (accessToken, refreshToken, profile, done) => {
    let user
        user = {
            email: profile.email ?? profile.username,
            rol: "user"
        }
        await userRepository.crear(user)
    done(null, user)
}))





// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
// passport.deserializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => {
    const { password, ...userData } = user;
    next(null, userData);
});

// estos son para cargar en express como middlewares a nivel aplicacion
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

// estos son para cargar como middlewares antes de los controladores correspondientes
// export const authenticateLocal = 
export const autenticacionUserPass = passport.authenticate('login', { failWithError: true })
export const autenticacionPorGithub = passport.authenticate('github', { scope: [ 'read:user' ] })
export const autenticacionPorGithub_CB = passport.authenticate('github', { failWithError: true })








