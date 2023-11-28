const { Router } = require('express');
const passport = require('passport');
const { celebrate } = require('celebrate');
const { authController } = require('../controllers');
const { opts, userValidation } = require('../validations');

const router = Router();


router
	.route('/register')
	.post(
		celebrate(userValidation.registerSchema, opts),
		authController.registerUser
	);

router
	.route('/login')
	.post(
		celebrate(userValidation.loginSchema, opts),
		authController.loginWithEmailAndPassword
	);

// password reset
router
	.route('/password-reset/get-code')
	.post(
		celebrate(userValidation.sendRequestEmailSchema, opts),
		authController.sendResetPasswordEmail
	);

router
	.route('/password-reset/verify/:token')
	.post(
		celebrate(userValidation.resetPasswordSchema, opts),
		authController.resetPassword
	);

// google auth
router.route('/google').get(authController.loginWithGoogle);

router
	.route('/google/callback')
	.get(passport.authenticate('google'), authController.authThirdPartyCallback);

// github auth
router.route('/github').get(authController.loginWithGithub);

router
	.route('/github/callback')
	.get(passport.authenticate('github'), authController.authThirdPartyCallback);

module.exports = router;
