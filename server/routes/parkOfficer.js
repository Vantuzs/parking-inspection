const parkOfficerRouter = require("express").Router();

const imageRouter = require("./image");
const protocolRouter = require("./protocol");
const ParkOfficerController = require("../controllers/ParkOfficer.controller");
const ProtocolController = require("../controllers/Protocol.Controller");
const { checkToken } = require("../middlewares/checkToken");
const { checkAdmin } = require("../middlewares/checkAdmin");
const {checkBan} = require('../middlewares/checkBan')

parkOfficerRouter
  .route("/")
  .get(checkToken,checkBan, ParkOfficerController.getAllParkOfficers)
  .post(checkToken,checkBan, checkAdmin, ParkOfficerController.createParkOfficer);

parkOfficerRouter
  .route("/protocols")
  .get(checkToken,checkBan, ProtocolController.getAllProtocols);

parkOfficerRouter
  .route("/:id")
  .get(checkToken,checkBan, ParkOfficerController.getParkOfficerById)
  .put(checkToken,checkBan, checkAdmin, ParkOfficerController.updateParkOfficerById)
  .delete(checkToken,checkBan, checkAdmin, ParkOfficerController.deleteParkOfficerById);

parkOfficerRouter
  .route("/:id/dismiss")
  .put(checkToken,checkBan, checkAdmin, ParkOfficerController.dismissParkOfficerById);

parkOfficerRouter.use("/:officerId/protocols", protocolRouter);
parkOfficerRouter.use("/protocols/:protocolId/images", imageRouter);

module.exports = parkOfficerRouter;
