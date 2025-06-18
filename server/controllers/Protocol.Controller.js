const createHttpError = require("http-errors");
const { Protocol, ParkOfficer, Image } = require("../models");

// getAllProtocols
// getAllProtocolsByOfficerId
// createProtocol
// updateProtocolById
// deleteProtocolById

module.exports.getAllProtocols = async (req, res, next) => {
  try {
    const { pagination } = req;
    const protocols = await Protocol.fidAll({
      include: [
        {
          model: ParkOfficer,
          attributes: ["id", "full_name", "badge_number"],
          as: "parkOfficer",
        },
        {
          model: Image,
          attributes: ["id", "path"],
          as: "image",
        },
      ],
      order: [["updated_at", "DESC"]],
      ...pagination,
    });

    if (!protocols) {
      return next(createHttpError(404, "Protocols not found"));
    }

    return res.status(200).send({ data: protocols });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProtocolsByOfficerId = async (req, res, next) => {
  try {
    const {
      params: { officerId },
      pagination,
    } = req;

    const protocols = await Protocol.findAll({
      where: { officerId },
      include: [
        {
          model: ParkOfficer,
          attributes: ["id", "full_name", "badge_number"],
          as: "parkOfficer",
        },
        {
          model: Image,
          attributes: ["id", "path"],
          as: "image",
        },
      ],
      order: [["updated_at", "DESC"]],
      ...pagination,
    });

    if (!protocols) {
      return next(createHttpError(404, "Protocols not found"));
    }

    return res.status(200).send({ data: protocols });
  } catch (error) {
    next(error);
  }
};

module.exports.createProrocol = async (req, res, next) => {
  try {
    const { body, files } = req;

    const createdProtocol = await Protocol.create(body);

    if (!createdProtocol) {
      return next(createHttpError(400, "Protocol not created"));
    }

    if (files?.length) {
      const images = files.map((file) => ({
        path: file.filename,
        protocolId: createdProtocol.id,
      }));

      await Image.bulkCreate(images);
    }

    const protocolWithData = await Protocol.findAll({
      where: { id: createdProtocol.id },
      include: [
        {
          model: ParkOfficer,
          attributes: ["id", "full_name", "badge_number"],
          as: "parkOfficer",
        },
        {
          model: Image,
          attributes: ["id", "path"],
          as: "image",
        },
      ],
      order: [["updated_at", "DESC"]],
    });

    return res.status(201).send({ data: protocolWithData });
  } catch (error) {
    next(error);
  }
};
module.exports.updateProtocolById = async (req, res, next) => {
  try {
    const {
      body,
      files,
      params: { id },
    } = req;

    const [count, [updatedProtocol]] = await Protocol.update(body, {
      where: { id },
      returning: true,
    });

    if (files?.length) {
      const images = files.map((file) => ({
        path: file.filename,
        protocolId: updatedProtocol.id,
      }));

      await Image.bulkCreate(images);
    }

    if (count === 0) {
      return next(createHttpError(404, "Protocol not found"));
    }

    const protocolWithData = await Protocol.findAll({
      where: { id: updatedProtocol.id },
      include: [
        {
          model: ParkOfficer,
          attributes: ["id", "full_name", "badge_number"],
          as: "parkOfficer",
        },
        {
          model: Image,
          attributes: ["id", "path"],
          as: "image",
        },
      ],
      order: [["updated_at", "DESC"]],
    });

    return res.status(200).send({ data: protocolWithData });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteProtocolById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const count = await Protocol.delete({
      where: { id },
    });

    if (count === 0) {
      return next(createHttpError(404, "Protocol not found"));
    }

    return res.status(200).end();
  } catch (error) {
    next(error);
  }
};
