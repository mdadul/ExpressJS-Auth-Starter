/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { Education } = require('../models');
const { Experience } = require('../models');
const { Certification } = require('../models');
const { Project } = require('../models');

const getUsers = async () => {
	const users = await User.find({}).select('-password');
	return users;
};

const getUserById = async (id) => {
	const user = await User.findById(id).select('-password');

	if (user) {
		const education = await Education.find({ userId: id }).select('-userId');
		const experience = await Experience.find({ userId: id }).select('-userId');
		const certification = await Certification.find({ userId: id }).select(
			'-userId'
		);
		const project = await Project.find({ userId: id }).select('-userId');

		const profile = {
			user,
			education,
			experience,
			certification,
			project,
		};
		return profile;
	}
	throw new Error('user not found');
};

const getUserByOpts = async (opts) => {
	const user = await User.findOne(opts).select('-password');
	if (user) {
		return user;
	}
	throw new Error('user not found');
};

const registerUser = async (userData) => {
	const user = await User.findOne({ email: userData.email });
	if (user) {
		throw new Error('email already exists');
	}

	const salt = await bcrypt.genSalt();
	userData.password = await bcrypt.hash(userData.password, salt);

	const newUser = await User.create(userData);
	newUser.password = undefined;
	return newUser;
};

const updateUserById = async (id, userData) => {
	if (userData.password) {
		const salt = await bcrypt.genSalt();
		userData.password = await bcrypt.hash(userData.password, salt);
	}
	if (userData.email && (await User.isEmailTaken(userData.email, id))) {
		throw new Error('email is already taken');
	}
	const user = await User.findByIdAndUpdate(id, userData);
	if (user) {
		return user;
	}
	throw new Error('user not found');
};

const deleteUserById = async (id) => {
	const user = await User.findById(id);
	if (user) {
		await user.remove();
		return user;
	}
	throw new Error('user not found');
};

const loginWithEmailAndPassword = async (email, password) => {
	const user = await User.findOne({ email });
	if (user) {
		const auth = user.password
			? await bcrypt.compare(password, user.password)
			: null;
		if (auth) {
			user.password = undefined;
			return user;
		}
		throw new Error('incorrect password');
	}
	throw new Error('email not registered');
};

const registerWithThirdParty = async (userData) => {
	const user = await User.findOne({ email: userData.email }).select(
		'-password'
	);
	if (user) {
		return user;
	}
	const newUser = await User.create(userData);
	return newUser;
};

module.exports = {
	getUsers,
	getUserById,
	getUserByOpts,
	registerUser,
	loginWithEmailAndPassword,
	registerWithThirdParty,
	updateUserById,
	deleteUserById,
};
