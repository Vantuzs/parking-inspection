"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParkOfficer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Protocol }) {
      ParkOfficer.hasMany(Protocol, {
        foreignKey: "officerId",
      });
    }
  }
  ParkOfficer.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      badgeNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
        isWorked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          validate: {
            notEmpty: true,
            notNull: true
          }
        }
      },
    },
    {
      sequelize,
      modelName: "ParkOfficer",
      tableName: "park_officers",
      underscored: true,
      timestamps: true,
    }
  );
  return ParkOfficer;
};
