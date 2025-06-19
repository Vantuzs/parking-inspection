const imageRouter = require('express').Router({mergeParams: true});
const ImageController = require('../controllers/Image.controller');
const {uploadImages} = require('../middlewares/imagesUpload')

imageRouter
.route('/')
.get(ImageController.getProtocolImages)
.post(uploadImages,ImageController.addProtocolImage)

imageRouter
.route('/:id')
.get(ImageController.getImageById)
.delete(ImageController.deleteImageById)


module.exports = imageRouter;