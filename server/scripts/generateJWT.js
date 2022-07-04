const jwt = require('jsonwebtoken');
const generateJWT = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
		expiresIn: '12h',
	});
};

module.exports = generateJWT;
