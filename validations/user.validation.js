const { Joi, Segments } = require('celebrate');

const passwordMessage =
	'password must contain at least one uppercase letter, one lowercase letter, and one numeric digit';

const loginSchema = {
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string(),
	}),
};

// To check a password between 8 to 15 characters
// which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special
// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
// (?=.*[!@#$&*])
const registerSchema = {
	[Segments.BODY]: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string()
			.required()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/)
			.message(passwordMessage),
		picture: Joi.string(),
		isAdmin: Joi.boolean().default(false),
	}),
};

const updateSchema = {
	[Segments.BODY]: Joi.object().keys({
		firstName: Joi.string(),
		lastName: Joi.string(),
		email: Joi.string().email(),
		password: Joi.string()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/)
			.message(passwordMessage),
		picture: Joi.string(),
		isAdmin: Joi.boolean(),
	}),
};

const sendRequestEmailSchema = {
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().email().required(),
	}),
};

const resetPasswordSchema = {
	[Segments.BODY]: Joi.object().keys({
		password: Joi.string()
			.required()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/)
			.message(passwordMessage),
	}),
};

module.exports = {
	loginSchema,
	registerSchema,
	updateSchema,
	sendRequestEmailSchema,
	resetPasswordSchema,
};
