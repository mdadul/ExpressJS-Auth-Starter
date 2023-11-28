const userValidation = require('./user.validation');
// celebration options
const opts = {
	abortEarly: false,
	errors: {
		wrap: { label: '' },
	},
};
module.exports = {
	userValidation,
	opts,
};
