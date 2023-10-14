import {Strategy as GitHubStrategy} from 'passport-github2';
import {Strategy as LocalStrategy} from 'passport-local';
import enviroment from './environment.js';
import {initializeAuthService} from '../services/auth.service.js';
import {logger} from './logger.js';
import passport from 'passport';

const {GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL} = enviroment;
export default async function iniPassport() {
	const authService = await initializeAuthService();
	passport.use(
		'login',
		new LocalStrategy(
			{usernameField: 'email'},
			async (username, password, done) => {
				logger.debug(`Attempting to authenticate user: ${username}`);
				try {
					const user = await authService.loginUser(username, password);
					logger.info(`User ${username} authenticated successfully`);
					return done(null, user);
				} catch (err) {
					logger.error(`Authentication failed for user ${username}`);
					return done(null, false, {message: 'Invalid credentials'});
				}
			},
		),
	);

	passport.use(
		'register',
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: 'email',
			},
			async (req, username, password, done) => {
				try {
					const {first_name, last_name, age} = req.body;
					const user = {
						email: username,
						first_name,
						last_name,
						age,
						role: 'user',
						password,
					};
					const userCreated = await authService.registerUser(user);
					return done(null, userCreated);
				} catch (err) {
					return done(null, false, {message: 'Error during registration'});
				}
			},
		),
	);

	// GitHub Strategy
	passport.use(
		'github',
		new GitHubStrategy(
			{clientID: GITHUB_CLIENT_ID,
				clientSecret: GITHUB_CLIENT_SECRET,
				callbackURL: GITHUB_CALLBACK_URL},
			async (accessToken, _, profile, done) => {
				try {
					const user = await authService.githubAuth(accessToken, profile);
					return done(null, user);
				} catch (err) {
					logger.error('Error during GitHub authentication:', err);
					return done(null, false, {
						message: 'Error during GitHub authentication',
					});
				}
			}
		)
	)

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			let user = await authService.findUserById(id);
			done(null, user);
		} catch (err) {
			logger.error(`Deserialization failed for user ID ${id}`);
			return done(null, false, {
				message: 'Error during user deserialization',
			});
		}
	});
}
