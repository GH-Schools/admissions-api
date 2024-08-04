const { UUIDV4 } = require('sequelize');
const { APPLICANT_INTERVIEW_STATUSES } = require('../src/constants');

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
      sessionId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Session',
          key: 'sessionId',
          as: 'sessionId'
        }
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      middleName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passportPhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      residentialAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      regionOfResidence: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nationalIDType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nationalIDNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currentJob: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameOfSchoolAttended1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      locationOfSchoolAttended1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yearAttended1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qualification1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nameOfSchoolAttended2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      locationOfSchoolAttended2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yearAttended2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qualification2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nameOfSchoolAttended3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      locationOfSchoolAttended3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yearAttended3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qualification3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferredSchool: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferredCourse: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      session: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferHostel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      hasMedicalCondition: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      medicalCondition: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hasDisability: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      disability: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      priorExperience: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      priorExperienceSpecialization: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorRelationship: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorOccupation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sponsorMobile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentReference: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hasCompletedForm: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      isEditable: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      applicantHasBeenCalled: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      interviewStatus: {
        allowNull: false,
        defaultValue: APPLICANT_INTERVIEW_STATUSES.PENDING,
        type: Sequelize.STRING,
      },
      comments: {
        allowNull: true,
        type: Sequelize.STRING,
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