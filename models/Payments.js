"use strict";
const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payments.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "userId",
      });

      Payments.belongsTo(models.Session, {
        foreignKey: "sessionId",
        targetKey: "sessionId",
      });
    }
  }

  Payments.init(
    {
      payId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      amount: {
        type: DataTypes.DECIMAL(16, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "GHC",
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sessionId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Payments",
      freezeTableName: true,
    }
  );

  return Payments;
};
