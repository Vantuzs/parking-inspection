const parkOfficerRouter = require("express").Router();

const imageRouter = require("./image");
const protocolRouter = require("./protocol");
const ParkOfficerController = require("../controllers/ParkOfficer.controller");
const ProtocolController = require("../controllers/Protocol.Controller");
const { checkToken } = require("../middlewares/checkToken");
const { checkAdmin } = require("../middlewares/checkAdmin");

parkOfficerRouter
  .route("/")
  .get(checkToken, ParkOfficerController.getAllParkOfficers)
  .post(checkToken, checkAdmin, ParkOfficerController.createParkOfficer);

parkOfficerRouter
  .route("/protocols")
  .get(checkToken, ProtocolController.getAllProtocols);

parkOfficerRouter
  .route("/:id")
  .get(checkToken, ParkOfficerController.getParkOfficerById)
  .put(checkToken, checkAdmin, ParkOfficerController.updateParkOfficerById)
  .delete(checkToken, checkAdmin, ParkOfficerController.deleteParkOfficerById);

parkOfficerRouter
  .route("/:id/dismiss")
  .put(checkToken, checkAdmin, ParkOfficerController.dismissParkOfficerById);

parkOfficerRouter.use("/:officerId/protocols", protocolRouter);
parkOfficerRouter.use("/protocols/:protocolId/images", imageRouter);

module.exports = parkOfficerRouter;
