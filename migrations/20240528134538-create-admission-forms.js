const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdmissionForms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formId: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'userId',
          as: 'userId'
        }
      },
      amount: {
        type: Sequelize.DECIMAL(16, 2),
        allowNull: false,
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sessionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Session',
          key: 'sessionId',
          as: 'sessionId'
        }
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
    await queryInterface.dropTable('AdmissionForms');
  }
};