const protocolRouter = require('express').Router({mergeParams: true});

const {uploadImages} = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');

const ProtocolController = require('../controllers/Protocol.Controller');

protocolRouter
.route('/')
// .get(paginate,ProtocolController.getAllProtocols)
.get(paginate,ProtocolController.getAllProtocolsByOfficerId)
.post(uploadImages,ProtocolController.createProrocol)

protocolRouter
.route('/:id')
.put(uploadImages,ProtocolController.updateProtocolById)
.delete(ProtocolController.deleteProtocolById)


module.exports = protocolRouter