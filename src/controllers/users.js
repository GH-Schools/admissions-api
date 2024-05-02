const User = require("../schemas/User");
const {
  sendSuccessResponse,
  StatusCodes,
  dataSource,
  sendErrorResponse,
  hash,
} = require("./imports");

const Controllers = function () {
  return {
    async login(req, res, next) {
      try {
        const { mobile, password } = req.body;

        const userWithPhone = await dataSource.fetchOneUser(mobile);
        if (!userWithPhone) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "User with that phone number does not exist"
          );
        }

        if (!hash.compareHashAndString(userWithPhone?.Password, password)) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "Incorrect login"
          );
        }

        const payload = userWithPhone;
        delete payload.Password;

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Working Fine",
          payload,
        });
      } catch (error) {
        return next(error);
      }
    },

    async registerUser(req, res, next) {
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

        const response = await dataSource.createUser(
          new User(firstName, lastName, email, mobile, password)
        );

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
