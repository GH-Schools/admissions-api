const AdmissionFormsSchema = require("../schemas/AdmissionFormsSchema");

const {
  dataSource,
  StatusCodes,
  sendErrorResponse,
  sendSuccessResponse,
  formatPhone,
  mapAsFilters,
} = require("./imports");

const Controllers = function () {
  return {
    /**
     *
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
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

        const existingForm = await dataSource.fetchOneAdmissionForm(
          userId,
          sessionId
        );
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

    /**
     *
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
    async saveAdmissionFormEducation(req, res, next) {
      try {
        const {
          source,
          reference,
          courseSession,
          yearAttended1,
          yearAttended2,
          yearAttended3,
          qualification1,
          qualification2,
          qualification3,
          preferredSchool,
          preferredCourse,
          priorExperience,
          nameOfSchoolAttended1,
          nameOfSchoolAttended2,
          nameOfSchoolAttended3,
          locationOfSchoolAttended1,
          locationOfSchoolAttended2,
          locationOfSchoolAttended3,
          priorExperienceSpecialization,
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
          yearAttended1,
          yearAttended2,
          yearAttended3,
          qualification1,
          qualification2,
          qualification3,
          priorExperience,
          preferredSchool,
          preferredCourse,
          nameOfSchoolAttended1,
          nameOfSchoolAttended2,
          nameOfSchoolAttended3,
          session: courseSession,
          locationOfSchoolAttended1,
          locationOfSchoolAttended2,
          locationOfSchoolAttended3,
          priorExperienceSpecialization,
          reference: paymentInfo?.reference ?? paymentInfo?.Reference,
        };

        console.log(newPayload);
        const existingForm = await dataSource.fetchOneAdmissionForm(
          userId,
          sessionId
        );
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

    /**
     *
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
    async saveAdmissionWelfareInformation(req, res, next) {
      try {
        const {
          reference,
          disability,
          sponsorName,
          preferHostel,
          hasDisability,
          medicalCondition,
          hasMedicalCondition,
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
          disability,
          sponsorName,
          preferHostel,
          hasDisability,
          medicalCondition,
          hasMedicalCondition,
          reference: paymentInfo?.reference ?? paymentInfo?.Reference,
          hasCompletedForm: true,
          sponsorRelationship,
          sponsorOccupation,
          sponsorAddress,
          sponsorMobile,
          sessionId,
        };

        console.log(newPayload);
        const existingForm = await dataSource.fetchOneAdmissionForm(
          userId,
          sessionId
        );
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

    /**
     *
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
    async updateAdmissionForm(req, res, next) {
      try {
        const {
          reference,
          disability,
          sponsorName,
          preferHostel,
          hasDisability,
          medicalCondition,
          hasMedicalCondition,
          sponsorRelationship,
          sponsorOccupation,
          sponsorAddress,
          sponsorMobile,
          formId,
          userId,
        } = req.body;

        const user = await dataSource.fetchOneUser(userId);
        if (!user) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Student record does not exist"
          );
        }

        const existingForm = await dataSource.fetchOneAdmissionForm(formId);
        if (!existingForm) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Form not found"
          );
        }

        const currentSession = await dataSource.fetchOneSession(
          existingForm?.sessionId
        );
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Session not found"
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
          disability,
          sponsorName,
          preferHostel,
          hasDisability,
          medicalCondition,
          hasMedicalCondition,
          sponsorRelationship,
          sponsorOccupation,
          sponsorAddress,
          sponsorMobile,
        };

        console.log(newPayload);

        let response = await dataSource.updateAdmissionForm(
          existingForm?.formId ?? existingForm?.FormID,
          newPayload
        );

        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while updating admission form"
          );
        }

        // await dataSource.updateUser(userId, newPayload);

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Successful",
          payload: response,
        });
      } catch (error) {
        return next(error);
      }
    },

    /**
     *
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
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

    /**
     *
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
    async getAllAdmissionForms(req, res, next) {
      try {
        let { adminId } = req.user;

        let authUser = await dataSource.fetchOneAdmin(adminId);
        if (!authUser) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Authenticated admin info not found"
          );
        }

        const currentSession = await dataSource.fetchOneSession();
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        // GET USERID AND SESSIONID
        const sessionId =
          currentSession?.sessionId ?? currentSession?.SessionID;

        // CHECK FOR USER RECORDS USING FILTER PARAMS
        const filters = mapAsFilters({ sessionId, ...req.query });
        const admissionForms = await dataSource.fetchAllAdmissionForms(filters);

        if (!admissionForms) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No admission record found"
          );
        }

        const { rows, count } = admissionForms;

        console.log(rows, count);
        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Found Successfully",
          totalCount: count,
          payload: rows,
        });
      } catch (error) {
        return next(error);
      }
    },

    /**
     *
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
    async downloadAdmissionForm(req, res, next) {
      try {
        const { formId } = req.body;
        const form = await dataSource.fetchOneAdmissionForm(formId);
        if (!form) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Form not found"
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
