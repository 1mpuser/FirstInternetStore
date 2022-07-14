//const { where } = require('sequelize/types');

const itemSearchAndCountInDifferentTables = (
	ItemModel,
	arrWhichWePushInWhere,
	...elemsWithNeededPropertiesAfterWhere
) => {
	if (arrWhichWePushInWhere.length == 0)
		return ItemModel.findAndCountAll({
			...elemsWithNeededPropertiesAfterWhere,
		});
	return ItemModel.findAndCountAll({
		where: { ...arrWhichWePushInWhere },
		...elemsWithNeededPropertiesAfterWhere,
	});
};

module.exports = itemSearchAndCountInDifferentTables;
