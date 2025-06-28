const parkOfficerRouter = require('express').Router();

const imageRouter = require('./image');
const protocolRouter = require('./protocol');
const ParkOfficerController = require('../controllers/ParkOfficer.controller');
const ProtocolController = require('../controllers/Protocol.Controller')
const {checkToken} = require('../middlewares/checkToken')

parkOfficerRouter
.route('/')
.get(checkToken,ParkOfficerController.getAllParkOfficers)
.post(checkToken,ParkOfficerController.createParkOfficer);

parkOfficerRouter.route('/protocols')
.get(checkToken,ProtocolController.getAllProtocols)

parkOfficerRouter
.route('/:id')
.get(checkToken,ParkOfficerController.getParkOfficerById)
.put(checkToken,ParkOfficerController.updateParkOfficerById)
.delete(checkToken,ParkOfficerController.deleteParkOfficerById)

parkOfficerRouter
.route('/:id/dismiss')
.put(checkToken,ParkOfficerController.dismissParkOfficerById)

parkOfficerRouter.use('/:officerId/protocols',protocolRouter)
parkOfficerRouter.use('/protocols/:protocolId/images',imageRouter)

module.exports = parkOfficerRouter;