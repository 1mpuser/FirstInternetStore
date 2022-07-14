const { Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
	async create(req, res, next) {
		try {
			let { rate, userId, deviceId } = req.body;
			const rating = await Rating.create({
				rate,
				userId,
				deviceId,
			});
			return res.json(rating);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}
	async getAll(req, res) {
		let { userId, deviceId } = req.query;
		let ratings;
		if (!userId && !deviceId) {
			ratings = Rating.findAndCountAll();
		}
		if (userId && !deviceId)
			ratings = Rating.findAndCountAll({ where: { userId } });
		if (userId && deviceId)
			ratings = Rating.findAndCountAll({ where: { userId, deviceId } });
		return res.json(ratings);
	}
}
module.exports = new RatingController();
