const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User, Basket } = require('../models/models');
const jwt = require('jsonwebtoken');
const { generatePath } = require('react-router');
const generateJWT = require('../scripts/generateJWT');
class UserController {
	async registration(req, res, next) {
		const { email, password, role } = req.body;
		if (!email || !password) {
			return next(ApiError.badRequest('Incorrect password or email'));
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate)
			return next(ApiError.badRequest('User with with email already exists!'));
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({ email, role, password: hashPassword });
		const basket = await Basket.create({ userId: user.id });
		const token = jwt.sign(
			{ id: user.id, email, role },
			process.env.SECRET_KEY,
			{
				expiresIn: '12h',
			}
		);
		return res.json({ token });
	}
	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return next(ApiError.internal('User with this email not found!'));
		}
		const comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword)
			return next(ApiError.internal('Incoorrect password entered'));
		const token = generateJWT(user.id, user.email, user.role);
		return res.json({ token });
	}
	async check(req, res, next) {
		const { id } = req.query;
		if (!id) {
			next(ApiError.internal('Id is not entered correctly'));
		}
		res.json(id);
	}
}
module.exports = new UserController();
