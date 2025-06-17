"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Protocol }) {
      Image.belongsTo(Protocol, {
        foreignKey: "protocolId",
      });
    }
  }
  Image.init(
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      }
    },
    {
      sequelize,
      modelName: "Image",
      tableName: "images",
      underscored: true,
      timestamps: true,
    }
  );
  return Image;
};
