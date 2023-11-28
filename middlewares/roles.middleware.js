const check =
	(...roles) =>
	(req, res, next) => {
		if (!req.userId) {
			return res.status(403).json({ msg: 'You are not allowed to do this' });
		}
		const hasRole = roles.find((role) => req.userRole === role);
		if (!hasRole) {
			return res.status(403).json({ msg: 'You are not allowed to do this' });
		}

		return next();
	};

const role = {
	check,
};

module.exports = role;
