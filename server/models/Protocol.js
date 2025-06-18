"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Protocol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ParckOfficer,Image }) {
      Protocol.belongsTo(ParckOfficer, {
        foreignKey: "officerId",
      });
      Protocol.hasMany(Image,{
        foreignKey: "protocolId",
      })
    }
  }
  Protocol.init(
    {
      serviceNotes: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      fineAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      violatorFullName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      violatorPassportNumber: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Protocol",
      tableName: "protocols",
      underscored: true,
      timestamps: true,
    }
  );
  return Protocol;
};
