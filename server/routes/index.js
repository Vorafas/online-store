const Router = require('express');
const deviceRouter = require('./device-router');
const userRouter = require('./user-router');
const brandRouter = require('./brand-router');
const typeRouter = require('./type-router');


const router = new Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

module.exports = router;