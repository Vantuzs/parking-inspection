const { ParkOfficer } = require("../models");
const createHttpError = require("http-errors");

// getAllParkOfficers
// getParkOfficerById
// createParkOfficer
// updateParkOfficerById
// deleteParkOfficerById
// disnisParkOfficerById

module.exports.getAllParkOfficers = async (req, res, next) => {
  try {
    const parkOfficers = await ParkOfficer.findAll();

    return res.status(200).send({ data: parkOfficers });
  } catch (error) {
    next(error);
  }
};

module.exports.getParkOfficerById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const parkOfficer = await ParkOfficer.findByPk(id);

    if (!parkOfficer) {
      return next(createHttpError(404, "Park officer not found"));
    }

    return res.status(200).send({ data: parkOfficer });
  } catch (error) {
    next(error);
  }
};

module.exports.createParkOfficer = async (req, res, next) => {
  try {
    const { body } = req;

    const createdParkOfficer = await ParkOfficer.create(body);

    if (!createdParkOfficer) {
      return next(createHttpError(400, "Park officer not created"));
    }

    return res.status(201).send({ data: createdParkOfficer });
  } catch (error) {
    next(error);
  }
};

module.exports.updateParkOfficerById = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const [count, [updatedParkOfficer]] = await ParkOfficer.update(body, {
      where: { id },
      reutrning: true,
    });

    if (count === 0) {
      return next(createHttpError(404, "Park officer not found"));
    }

    return res.status(200).send({ data: updatedParkOfficer });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteParkOfficerById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const deletedParkOfficer = await ParkOfficer.destroy({ where: { id } });

    if (deletedParkOfficer === 0) {
      return next(createHttpError(404, "Park officer not found"));
    }

    return res.status(200);
  } catch (error) {
    next(error);
  }
};

module.exports.dismissParkOfficerById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const [count, [updateParkOfficer]] = await ParkOfficer.update(
      { isWorked: false },
      {
        where: { id },
        returning: true,
      }
    );

    if (count === 0) {
      return next(createHttpError(404, "Park officer not found"));
    }

    return res.status(200).send({ data: updateParkOfficer });
  } catch (error) {
    next(error);
  }
};
