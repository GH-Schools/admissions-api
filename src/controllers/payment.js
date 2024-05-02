const {
  sendSuccessResponse,
  StatusCodes,
  dataSource,
  sendErrorResponse,
  hash,
} = require("./imports");

const Controllers = function () {
  return {
    async paymentWebhook(req, res, next) {
      try {
        const { firstName, lastName, email, mobile, password } = req.body;

        const userWithPhone = await dataSource.fetchOneUser(mobile);
        if (userWithPhone) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "User with that phone number exists"
          );
        }

        const response = await dataSource.createUser({
          firstName,
          lastName,
          email,
          mobile,
          password,
        });

        if (response?.updates?.updatedRows !== 1) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while creating users"
          );
        }

        console.log("output for createUser", JSON.stringify(response, null, 2));
        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Successfull",
          payload: response,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
