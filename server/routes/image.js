const imageRouter = require('express').Router({mergeParams: true});
const ImageController = require('../controllers/Image.controller');
const {uploadImages} = require('../middlewares/imagesUpload')
const {checkToken} = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');
const { checkBan } = require('../middlewares/checkBan');

imageRouter
.route('/')
.get(checkToken, checkBan, ImageController.getProtocolImages)
.post(checkToken, checkBan, checkAdmin, uploadImages, ImageController.addProtocolImage)

imageRouter
.route('/:id')
.get(checkToken, checkBan, ImageController.getImageById)
.delete(checkToken, checkBan, checkAdmin, ImageController.deleteImageById)


module.exports = imageRouter;