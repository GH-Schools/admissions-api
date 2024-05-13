const statusCodes = require("../constants/statusCodes");
const { sendErrorResponse } = require("../utils/sendAPIResponses");
const { verifyHashedToken } = require("../utils/tokenProcessor");

module.exports = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    if (!authorization || typeof authorization !== "string") {
      return sendErrorResponse(
        res,
        statusCodes.UNAUTHORIZED,
        "Invalid Unauthorized!"
      );
    }

    const token = authorization.replace(/bearer/gi, '').trim();
    const payload = verifyHashedToken(token);

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
