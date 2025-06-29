const protocolRouter = require('express').Router({mergeParams: true});

const {uploadImages} = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');
const {checkToken} = require('../middlewares/checkToken')
const { checkAdmin } = require('../middlewares/checkAdmin');

const ProtocolController = require('../controllers/Protocol.Controller');

protocolRouter
.route('/')
.get(checkToken,paginate,ProtocolController.getAllProtocolsByOfficerId)
.post(checkToken,checkAdmin,uploadImages,ProtocolController.createProrocol)

protocolRouter
.route('/:id')
.put(checkToken,checkAdmin,uploadImages,ProtocolController.updateProtocolById)
.delete(checkToken,checkAdmin,ProtocolController.deleteProtocolById)


module.exports = protocolRouter