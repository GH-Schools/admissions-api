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
    async registerNewSession(req, res, next) {
      try {
        const { title, startDate, endDate, extraDetails = [] } = req.body;

        const newSessionSchema = new SessionSchema(
          title,
          startDate,
          endDate,
          JSON.stringify(extraDetails)
        );
        let response = await dataSource.addNewSession(newSessionSchema);
        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while creating session"
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

    async getCurrentSession(req, res, next) {
      try {
        const session = await dataSource.fetchOneSession();
        if (!session) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        const payload = session;

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Session found successfully",
          payload,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
