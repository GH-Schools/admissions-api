const AdmissionFormsSchema = require("../schemas/AdmissionFormsSchema");

const {
  dataSource,
  StatusCodes,
  sendErrorResponse,
  sendSuccessResponse,
  formatPhone,
} = require("./imports");

const Controllers = function () {
  return {
    async saveAdmissionPersonalProfile(req, res, next) {
      try {
        const {
          sex,
          dob,
          email,
          mobile1,
          language,
          lastName,
          reference,
          firstName,
          middleName,
          currentJob,
          nationality,
          passportPhoto,
          nationalIDType,
          nationalIDNumber,
          regionOfResidence,
          residentialAddress,
        } = req.body;

        let { sessionId } = req.body;
        const { userId } = req.user;

        const user = await dataSource.fetchOneUser(userId);
        if (!user) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Authenticated user does not exist"
          );
        }

        const currentSession = await dataSource.fetchOneSession(sessionId);
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        sessionId = currentSession?.sessionId ?? currentSession?.SessionID;

        const paymentInfo = await dataSource.fetchOnePayment(reference);
        if (!paymentInfo) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Reference does not match any payment record"
          );
        }

        const newPayload = {
          sex,
          dob,
          email,
          userId,
          lastName,
          language,
          sessionId,
          firstName,
          middleName,
          currentJob,
          nationality,
          nationalIDType,
          nationalIDNumber,
          regionOfResidence,
          residentialAddress,
          mobile1: formatPhone(mobile1),
          reference: paymentInfo?.reference ?? paymentInfo?.Reference,
        };

        console.log(newPayload);

        const existingForm = await dataSource.fetchOneAdmissionForm(sessionId);
        const newForm = new AdmissionFormsSchema({
          passportPhoto,
          ...newPayload,
        });

        let response = !existingForm
          ? await dataSource.saveAdmissionForm(newForm)
          : await dataSource.updateAdmissionForm(
              existingForm?.formId ?? existingForm?.FormID,
              { passportPhoto, ...newPayload }
            );

        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while saving admission form"
          );
        }

        console.log(response);
        await dataSource.updateUser(userId, {
          avatarUrl: passportPhoto,
          ...newPayload,
        });

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Successful",
          payload: response,
        });
      } catch (error) {
        return next(error);
      }
    },

    async saveAdmissionFormEducation(req, res, next) {
      try {
        const {
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
          courseSession,
          source,
          priorExperience,
          priorExperienceSpecialization,
          reference,
          // mobile2,
        } = req.body;

        let { sessionId } = req.body;
        const { userId } = req.user;

        const user = await dataSource.fetchOneUser(userId);
        if (!user) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Authenticated user does not exist"
          );
        }

        const currentSession = await dataSource.fetchOneSession(sessionId);
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        sessionId = currentSession?.sessionId ?? currentSession?.SessionID;

        const paymentInfo = await dataSource.fetchOnePayment(reference);
        if (!paymentInfo) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Reference does not match any payment record"
          );
        }

        const newPayload = {
          // mobile2: formatPhone(mobile2),
          userId,
          source,
          sessionId,
          courseSession,
          yearAttended1,
          yearAttended2,
          yearAttended3,
          qualification1,
          qualification2,
          qualification3,
          priorExperience,
          preferredCourse,
          nameOfSchoolAttended1,
          nameOfSchoolAttended2,
          nameOfSchoolAttended3,
          locationOfSchoolAttended1,
          locationOfSchoolAttended2,
          locationOfSchoolAttended3,
          priorExperienceSpecialization,
          reference: paymentInfo?.reference ?? paymentInfo?.Reference,
        };

        console.log(newPayload);
        const existingForm = await dataSource.fetchOneAdmissionForm(sessionId);
        const newForm = new AdmissionFormsSchema(newPayload);

        let response = !existingForm
          ? await dataSource.saveAdmissionForm(newForm)
          : await dataSource.updateAdmissionForm(
              existingForm?.formId ?? existingForm?.FormID,
              newPayload
            );

        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while saving admission form education"
          );
        }

        await dataSource.updateUser(userId, newPayload);

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Successful",
          payload: response,
        });
      } catch (error) {
        return next(error);
      }
    },

    async saveAdmissionWelfareInformation(req, res, next) {
      try {
        const {
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
          courseSession,
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

        let { sessionId } = req.body;
        const { userId } = req.user;

        const user = await dataSource.fetchOneUser(userId);
        if (!user) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Authenticated user does not exist"
          );
        }

        const currentSession = await dataSource.fetchOneSession(sessionId);
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        sessionId = currentSession?.sessionId ?? currentSession?.SessionID;

        const paymentInfo = await dataSource.fetchOnePayment(reference);
        if (!paymentInfo) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Reference does not match any payment record"
          );
        }

        const newPayload = {
          userId,
          sessionId,
          reference: paymentInfo?.reference ?? paymentInfo?.Reference,
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
          mobile1: formatPhone(mobile1),
          mobile2: formatPhone(mobile2),
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
          courseSession,
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
        };

        console.log(newPayload);
        const newForm = new AdmissionFormsSchema(newPayload);

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
