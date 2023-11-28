/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('./index');
const { userService } = require('../services');
const logger = require('../logger');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	userService.getUserById(id).then((user) => {
		done(null, user);
	});
});

// local authentication
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			// eslint-disable-next-line consistent-return
		},
		async (email, password, done) => {
			try {
				const user = await userService.loginWithEmailAndPassword(
					email,
					password
				);
				return done(null, user);
			} catch (error) {
				logger.info(error.message);
				done(error, false, { message: error.message });
			}
		}
	)
);

const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = config.jwt.secret;

// JWT auth
passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const user = await userService.getUserById(jwt_payload.id);
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		} catch (error) {
			logger.info(error);
		}
	})
);

// Google auth
passport.use(
	new GoogleStrategy(
		{
			// options for strategy
			callbackURL: config.google.googleCallbackUrl,
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
		},
		async (accessToken, refreshToken, profile, done) => {
			// passport callback function
			try {
				const userData = {
					firstName: profile._json.given_name.toLowerCase(),
					lastName: profile._json.family_name.toLowerCase(),
					email: profile._json.email,
					picture: profile._json.picture,
					isConfirmed: true,
				};
				const user = await userService.registerWithThirdParty(userData);
				done(null, user);
			} catch (error) {
				logger.info(error.message);
				done(null, false);
			}
		}
	)
);

// github auth
passport.use(
	new GithubStrategy(
		{
			// options for strategy
			callbackURL: config.github.githubCallbackUrl,
			clientID: config.github.clientID,
			clientSecret: config.github.clientSecret,
		},
		async (accessToken, refreshToken, profile, done) => {
			// passport callback function
			try {
				const emailResponse = await fetch(
					'https://api.github.com/user/emails',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
							'User-Agent': 'Skillibly',
						},
					}
				);
				const emailData = await emailResponse.json();

				// Find the primary email
				const primaryEmail = emailData.find((email) => email.primary);

				if (primaryEmail) {
					const userData = {
						firstName: profile._json.name.toLowerCase(),
						lastName: profile._json.name.toLowerCase(),
						email: primaryEmail.email, // Use the email from GitHub API response
						picture: profile._json.avatar_url,
						isConfirmed: true,
					};
					const user = await userService.registerWithThirdParty(userData);
					done(null, user);
				} else {
					logger.info('No primary email found.');
					done(null, false);
				}
			} catch (error) {
				logger.info(error.message);
				done(null, false);
			}
		}
	)
);
