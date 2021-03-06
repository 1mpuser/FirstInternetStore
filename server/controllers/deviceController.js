const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const itemSearchAndCountInDifferentTables = require('../scripts/itemSearchInDifferentTables');

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + '.jpg';
			img.mv(path.resolve(__dirname, '..', 'static', fileName));
			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName,
			});

			if (info) {
				info = JSON.parse(info);
				info.forEach((i) =>
					DeviceInfo.create({
						title: i.title,
						description: i.description,
						deviceId: device.id,
					})
				);
			}

			return res.json(device);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		const query = req.query;
		let { brandId, typeId, limit, page } = query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		// const arr = [];
		// if (brandId) arr.push(brandId);
		// if (typeId) arr.push(typeId);
		// const devices = itemSearchAndCountInDifferentTables(
		// 	Device,
		// 	arr,
		// 	limit,
		// 	offset
		// );
		//tried to refactor but smth doesnt work
		let devices;
		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({ limit, offset }); //if nothing we'll return all
		} else if (brandId && !typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId },
				limit,
				offset,
			});
		} else if (!brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId },
				limit,
				offset,
			});
		} else if (brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId, brandId },
				limit,
				offset,
			});
		}
		return res.json(devices);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }],
		});
		return res.json(device);
	}
}

module.exports = new DeviceController();
