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
        const { title, startDate, endDate, extraDetails = [] } = req.body;

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
        const { searchParam } = req.params
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
