const imageRouter = require('express').Router({mergeParams: true});
const ImageController = require('../controllers/Image.controller');
const {uploadImages} = require('../middlewares/imagesUpload')
const {checkToken} = require('../middlewares/checkToken')

imageRouter
.route('/')
.get(checkToken,ImageController.getProtocolImages)
.post(checkToken,uploadImages,ImageController.addProtocolImage)

imageRouter
.route('/:id')
.get(checkToken,ImageController.getImageById)
.delete(checkToken,ImageController.deleteImageById)


module.exports = imageRouter;