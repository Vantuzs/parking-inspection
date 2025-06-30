const protocolRouter = require('express').Router({mergeParams: true});

const {uploadImages} = require('../middlewares/imagesUpload');
const paginate = require('../middlewares/paginate');
const {checkToken} = require('../middlewares/checkToken')
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

const ProtocolController = require('../controllers/Protocol.Controller');

protocolRouter
.route('/')
.get(checkToken, checkBan, paginate, ProtocolController.getAllProtocolsByOfficerId)
.post(checkToken, checkBan, checkAdmin, uploadImages,ProtocolController.createProrocol)

protocolRouter
.route('/:id')
.put(checkToken, checkBan, checkAdmin, uploadImages, ProtocolController.updateProtocolById)
.delete(checkToken, checkBan, checkAdmin, ProtocolController.deleteProtocolById)


module.exports = protocolRouter