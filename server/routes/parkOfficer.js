const parkOfficerRouter = require('express').Router();

const imageRouter = require('./image');
const protocolRouter = require('./protocol');
const ParkOfficerController = require('../controllers/ParkOfficer.controller');

parkOfficerRouter
.route('/')
.get(ParkOfficerController.getAllParkOfficers)
.post(ParkOfficerController.createParkOfficer);

parkOfficerRouter
.route('/:id')
.get(ParkOfficerController.getParkOfficerById)
.put(ParkOfficerController.updateParkOfficerById)
.delete(ParkOfficerController.deleteParkOfficerById)

parkOfficerRouter
.route('/:id/dismiss')
.put(ParkOfficerController.dismissParkOfficerById)

parkOfficerRouter.use('/:officerId/protocols',protocolRouter)
parkOfficerRouter.use('/protocols/:protocolId/images',imageRouter)

module.exports = parkOfficerRouter;