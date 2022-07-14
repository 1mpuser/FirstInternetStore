const { Basket } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
	async create(req, res) {
		const { userId } = req.body;
		const basket = await Basket.create({ userId });
		return res.json(basket);
	}
	async getAll(req, res) {
		const baskets = await Basket.findAndCountAll();
		return res.json(baskets);
	}
	async getOneFromUserId(req, res) {
		const { id } = req.params;
		const basket = await Basket.findOne({ where: { id } });
		return res.json(basket);
	}
}
module.exports = new BasketController();
