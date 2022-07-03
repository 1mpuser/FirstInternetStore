require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

//middleware should be in the end last error handler
app.use(errorHandler);
const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
	} catch (error) {
		console.log(error);
	}
};

app.listen(PORT, () => console.log(`Server started on port #${PORT}`));
// app.get('/', (req, res) => {
// 	res.send('Da mihi esse optimum');
// });
start();
