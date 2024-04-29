const { sendSuccessResponse, StatusCodes } = require("./imports");

const Controllers = function() {
  return {
    async healthCheck(req, res, next) {
      try {
        return sendSuccessResponse(res, StatusCodes.OK, {
          message: 'Working Fine'
        })
      } catch (error) {
        return next(error);
      }
    }
  }
};

module.exports = Controllers()