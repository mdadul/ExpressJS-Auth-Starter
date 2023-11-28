/* eslint-disable consistent-return */
const { userService, tokenService, mailerService } = require('../services');
const config = require('../config');
const logger = require('../logger');

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
module.exports.getUserProfile = async (req, res) => {
	try {
		const user = await userService.getUserById(req.params.id);
		res.status(200).send(user);
	} catch (error) {
		logger.info(error);
		res.status(400).send({ message: error.message });
	}
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
module.exports.updateUserProfile = async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			req.body.isAdmin = false;
		}
		await userService.updateUserById(req.user.id, req.body);
		res.status(200).send({ message: 'success' });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Private/Admin
module.exports.createUser = async (req, res) => {
	try {
		const user = await userService.registerUser(req.body);

		const emailToken = tokenService.createToken(
			{ id: user.id, email: user.email },
			config.jwt.JWT_EMAIL_SECRET,
			'6h'
		);

		const baseUrl = `${req.protocol}://${req.get('host')}`;
		const url = `${baseUrl}/api/auth/confirmation/${emailToken}`;

		mailerService.sendMail(user.email, 'Confirm Email', 'confirm-email', {
			url,
			name: user.firstName,
		});

		res.status(201).send(user);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
module.exports.getUsers = async (req, res) => {
	try {
		const users = await userService.getUsers();
		res.status(200).send(users);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
module.exports.getUserById = async (req, res) => {
	try {
		const user = await userService.getUserById(req.params.id);
		res.status(200).send(user);
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
module.exports.deleteUser = async (req, res) => {
	try {
		const user = await userService.deleteUserById(req.params.id);
		if (!user) {
			return res.status(404).send({ message: 'user not found' });
		}
		res.status(200).send({ message: 'success' });
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
module.exports.updateUser = async (req, res) => {
	try {
		const user = await userService.updateUserById(req.params.id, req.body);
		if (!user) {
			return res.status(404).send({ message: 'user not found' });
		}
		res.status(200).send({ message: 'success' });
	} catch (error) {
		res.status(404).send({ message: error.message });
	}
};

// @desc Resend confirmation email
// @route GET /api/users/get-activation-email
// @access Private
module.exports.sendConfirmEmail = async (req, res) => {
	try {
		const { email } = req.user;

		const user = await userService.getUserByOpts({ email });
		if (!user) {
			return res.status(404).send({ message: 'user not found' });
		}

		const emailToken = tokenService.createToken(
			{ id: user.id, email: user.email },
			config.jwt.JWT_EMAIL_SECRET,
			'6h'
		);

		const baseUrl = `${req.protocol}://${req.get('host')}`;
		const url = `${baseUrl}/api/auth/confirmation/${emailToken}`;

		mailerService.sendMail(email, 'Confirm Email', 'confirm-email', {
			url,
			name: '',
		});
		res.status(200).send({ message: 'success' });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

// @desc Confirm user's email
// @route GET /api/users/confirmation/:token
// @access Public
module.exports.confirmEmail = async (req, res) => {
	try {
		const { id } = tokenService.verifyToken(
			req.params.token,
			config.jwt.JWT_EMAIL_SECRET
		);
		await userService.updateUserById(id, { isConfirmed: true });
		res.status(200).send({ message: 'success' });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
