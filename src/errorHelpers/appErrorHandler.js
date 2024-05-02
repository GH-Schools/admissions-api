const statusCodes = require("../constants/statusCodes");
const { sendErrorResponse } = require("../utils/sendAPIResponses");

module.exports = (err, req, res, next) => {
  try {
    console.log(err);
    return sendErrorResponse(
      res,
      statusCodes.SERVER_ERROR,
      err.message ?? "An error occured"
    );
  } catch (error) {
    return sendErrorResponse(
      res,
      statusCodes.SERVER_ERROR,
      error.message ?? "An error occured"
    );
  }
};
