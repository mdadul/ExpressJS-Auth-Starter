/* eslint-disable no-unused-vars */
const fs = require('fs');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const config = require('../config');
const logger = require('../logger');

const email = config.email.user;
const { password } = config.email;
const { host } = config.email;
const { port } = config.email;
const { secure } = config.email;

const transporter = nodemailer.createTransport({
	host,
	port,
	secure,
	auth: {
		user: email,
		pass: password,
	},
});

// if you want to attach an image to the ejs file uncomment the attachment lines
const getAttachments = (templateName) => {
	switch (templateName) {
		case 'confirm-email':
			return [
				{
					filename: 'email.png',
					path: './public/images/email.png',
					cid: 'email_logo',
				},
			];
		case 'forgot-password-email':
			return [];
		default:
			return [];
	}
};

const sendMail = async (to, subject, templateName, data) => {
	try {
		const template = fs.readFileSync(
			`./templates/${templateName}.ejs`,
			'utf-8'
		);
		const compiledTemplate = ejs.compile(template);
		// const attachments = getAttachments(templateName);

		const mailOptions = {
			from: email,
			to,
			subject,
			html: compiledTemplate(data),
			// attachments: attachments
		};
		const info = transporter.sendMail(mailOptions);
		transporter.close();
		return info;
	} catch (error) {
		logger.error(error);
		return 'Due to some technical issue we are unable to send email. Please try again later.';
	}
};

module.exports = {
	sendMail,
};
