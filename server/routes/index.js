const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const basketRouter = require('./basketRouter');
const basketDeviceRouter = require('./basketDeviceRouter');
const ratingController = require('./ratingRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);
router.use('/basket', basketRouter);
router.use('/basketDevice', basketDeviceRouter);
router.use('/rating', ratingController);

module.exports = router;
