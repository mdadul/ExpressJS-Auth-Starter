/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
const { isCelebrateError } = require('celebrate');

const handleValidationError = (error, req, res, next) => {
	if (isCelebrateError(error)) {
		let errorMessage = '';
		error.details.forEach(
			(element) => (errorMessage += element.message.replace('. ', ','))
		);
		// const errorBody = error.details.get('body') || error.details.get('query');
		return res.status(400).send({
			message: errorMessage,
		});
	}
	return res.status(500).send(error.message);
};

module.exports = {
	handleValidationError,
};
