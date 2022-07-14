const { BasketDevice } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketDeviceController {
	async create(req, res, next) {
		try {
			const { deviceId, basketId } = req.body;
			const basketDevice = await BasketDevice.create({ deviceId, basketId });
			return res.json(basketDevice);
		} catch (error) {
			next(ApiError.badRequest(error.message));
		}
	}
	async getAll(req, res) {
		let { deviceId, basketId, limit, page } = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		let basketDevices;
		if (!deviceId && !basketId) {
			basketDevices = await BasketDevice.findAndCountAll({ limit, offset }); //if nothing we'll return all
		} else if (deviceId && !typeId) {
			basketDevices = await BasketDevice.findAndCountAll({
				where: { deviceId },
				limit,
				offset,
			});
		} else if (!deviceId && basketId) {
			basketDevices = await BasketDevice.findAndCountAll({
				where: { basketId },
				limit,
				offset,
			});
		} else if (deviceId && basketId) {
			basketDevices = await BasketDevice.findAndCountAll({
				where: { deviceId, basketId },
				limit,
				offset,
			});
		}
		return res.json(basketDevices);
	}
}
module.exports = new BasketDeviceController();
