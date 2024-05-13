"use strict";
const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Session.hasMany(models.Payments, {
        foreignKey: "sessionId",
        sourceKey: "sessionId",
      });
    }
  }

  Session.init(
    {
      sessionId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      startDate: {
        allowNull: true,
        type: DataTypes.DATE
      },
      endDate: {
        allowNull: true,
        type: DataTypes.DATE
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      details: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Session",
      freezeTableName: true,
    }
  );

  return Session;
};
