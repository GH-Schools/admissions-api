const SessionSchema = require("../schemas/SessionSchema");
const User = require("../schemas/UserSchema");
const {
  dataSource,
  StatusCodes,
  sendErrorResponse,
  sendSuccessResponse,
  formatPhone,
} = require("./imports");

const Controllers = function () {
  return {
    async newAdmission(req, res, next) {
      try {
        const {
          userId,
          sessionId,
          reference,
          firstName,
          middleName,
          lastName,
          email,
          passportPhoto,
          residentialAddress,
          regionOfResidence,
          sex,
          dob,
          nationality,
          mobile1,
          mobile2,
          nationalIDType,
          nationalIDNumber,
          currentJob,
          language,
          nameOfSchoolAttended1,
          locationOfSchoolAttended1,
          yearAttended1,
          qualification1,
          nameOfSchoolAttended2,
          locationOfSchoolAttended2,
          yearAttended2,
          qualification2,
          nameOfSchoolAttended3,
          locationOfSchoolAttended3,
          yearAttended3,
          qualification3,
          preferredCourse,
          session,
          preferHostel,
          hasMedicalCondition,
          medicalCondition,
          hasDisability,
          disability,
          source,
          priorExperience,
          priorExperienceSpecialization,
          sponsorName,
          sponsorRelationship,
          sponsorOccupation,
          sponsorAddress,
          sponsorMobile,
        } = req.body;

        const newForm = new AdmissionFormsSchema(
          title,
          startDate,
          endDate,
          JSON.stringify(extraDetails)
        );
        let response = await dataSource.saveAdmissionForm(newForm);
        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while saving admission form"
          );
        }

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Successful",
          payload: response,
        });
      } catch (error) {
        return next(error);
      }
    },

    async getAdmissionForm(req, res, next) {
      try {
        const { searchParam } = req.params;
        const form = await dataSource.fetchOneAdmissionForm(searchParam);
        if (!form) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing form found"
          );
        }

        const payload = form;

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Form found successfully",
          payload,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
