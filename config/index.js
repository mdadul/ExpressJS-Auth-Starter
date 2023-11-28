const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	PORT: process.env.PORT,
	mongo: {
		url: process.env.MONGO_URI,
		dbName: process.env.MONGO_DB_NAME,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		maxAge: process.env.JWT_MAX_AGE,
		emailSecret: process.env.JWT_EMAIL_SECRET,
	},
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
	},
	github: {
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		githubCallbackUrl: process.env.GITHUB_CALLBACK_URL,
	},
	email: {
		user: process.env.EMAIL_USER,
		password: process.env.EMAIL_PASSWORD,
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: process.env.EMAIL_SECURE,
	},
	client: {
		url: process.env.CLIENT_URL,
		resetUrl: process.env.CLIENT_RESET_URL,
		oauthRedirectUrl: process.env.CLIENT_OAUTH_REDIRECT_URL,
		confirmUrl: process.env.CLIENT_CONFIRM_URL,
	},
};
