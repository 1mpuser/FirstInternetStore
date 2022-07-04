const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}
	try {
		const token = req.headers.authorisation.split(' ')[1]; //cause first is type of token and token is about second place
		if (!token) {
			return res.status(401).json({ message: 'Not authorised' });
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Not authorised' });
	}
};
