'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventSchedule', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      eventType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EventSchedule');
  }
};