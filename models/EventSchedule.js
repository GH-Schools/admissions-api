const { Model, UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EventSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventSchedule.init(
    {
      eventId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      eventType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "EventSchedule",
      freezeTableName: true,
    }
  );
  return EventSchedule;
};
