const protocolRouter = require('express').Router({mergeParams: true});

const {uploadImages} = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');
const {checkToken} = require('../middlewares/checkToken')

const ProtocolController = require('../controllers/Protocol.Controller');

protocolRouter
.route('/')
// .get(paginate,ProtocolController.getAllProtocols)
.get(checkToken,paginate,ProtocolController.getAllProtocolsByOfficerId)
.post(checkToken,uploadImages,ProtocolController.createProrocol)

protocolRouter
.route('/:id')
.put(checkToken,uploadImages,ProtocolController.updateProtocolById)
.delete(checkToken,ProtocolController.deleteProtocolById)


module.exports = protocolRouter