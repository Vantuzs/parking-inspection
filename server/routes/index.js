const router = require('express').Router();
const parkOfficerRouter = require('./parkOfficer');
const userRouter = require('./user');

router.use('/users',userRouter)
router.use('/parkOfficers',parkOfficerRouter)

module.exports = router;