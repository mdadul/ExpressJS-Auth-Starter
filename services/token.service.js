const jwt = require('jsonwebtoken');
const config = require('../config');

const maxAge = config.jwt.maxAge || 365 * 24 * 60 * 60;
const jwtSecret = config.jwt.secret;

// create json web token
const createToken = (payload, secret = jwtSecret, expiresIn = maxAge) =>
	jwt.sign(payload, secret, {
		expiresIn,
	});

const verifyToken = (token, secret = jwtSecret) => jwt.verify(token, secret);


module.exports = {
	createToken,
	verifyToken,
};
