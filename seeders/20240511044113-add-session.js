const { v4 } = require("uuid");

const uuidv4 = v4;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const lastYear = new Date(
      currentYear - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    ).getFullYear();

    await queryInterface.bulkInsert(
      "Session",
      [
        {
          sessionId: uuidv4(),
          title: `${lastYear}/${currentYear}`,
          isActive: true,
          createdAt: currentDate,
          updatedAt: currentDate
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Session", null, {});
  },
};
