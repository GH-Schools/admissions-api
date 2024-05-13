'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Session', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sessionId: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        unique: true,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      details: {
        type: Sequelize.JSON,
        allowNull: true,
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
    await queryInterface.dropTable('Session');
  }
};