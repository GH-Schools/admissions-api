const { Model, UUIDV4 } = require("sequelize");
const { APPLICANT_INTERVIEW_STATUSES } = require("../src/constants");
module.exports = (sequelize, DataTypes) => {
  class AdmissionForms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdmissionForms.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "userId",
      });

      AdmissionForms.belongsTo(models.Session, {
        foreignKey: "sessionId",
        targetKey: "sessionId",
      });
    }
  }
  AdmissionForms.init(
    {
      formId: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      sessionId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passportPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      residentialAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regionOfResidence: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nationalIDType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationalIDNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentJob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameOfSchoolAttended1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locationOfSchoolAttended1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearAttended1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qualification1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nameOfSchoolAttended2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locationOfSchoolAttended2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearAttended2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qualification2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nameOfSchoolAttended3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locationOfSchoolAttended3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      yearAttended3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qualification3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferredSchool: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferredCourse: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      session: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferHostel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      hasMedicalCondition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      medicalCondition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hasDisability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      disability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      priorExperience: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      priorExperienceSpecialization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sponsorName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sponsorRelationship: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sponsorOccupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sponsorAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sponsorMobile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentReference: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hasCompletedForm: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      isEditable: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
      applicantHasBeenCalled: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      interviewStatus: {
        allowNull: true,
        defaultValue: APPLICANT_INTERVIEW_STATUSES.PENDING,
        type: DataTypes.STRING,
      },
      comments: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      deleted: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "AdmissionForms",
      freezeTableName: true,
    }
  );
  return AdmissionForms;
};
