/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, 'Please enter an email'],
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
		},
		picture: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'employer', 'instructor'],
			default: 'user',
		},
		isConfirmed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
	return !!user;
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
