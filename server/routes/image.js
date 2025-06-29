const imageRouter = require('express').Router({mergeParams: true});
const ImageController = require('../controllers/Image.controller');
const {uploadImages} = require('../middlewares/imagesUpload')
const {checkToken} = require('../middlewares/checkToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

imageRouter
.route('/')
.get(checkToken,ImageController.getProtocolImages)
.post(checkToken,checkAdmin,uploadImages,ImageController.addProtocolImage)

imageRouter
.route('/:id')
.get(checkToken,ImageController.getImageById)
.delete(checkToken,checkAdmin,ImageController.deleteImageById)


module.exports = imageRouter;