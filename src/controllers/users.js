const User = require("../schemas/User");
const { UserVerificationMailContent } = require("../views/HtmlViews");
const {
  hash,
  dataSource,
  StatusCodes,
  createHashedToken,
  sendErrorResponse,
  sendSuccessResponse,
  sendEmail,
  formatPhone,
} = require("./imports");

const Controllers = function () {
  const extractUserInfo = (user) => ({
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    mobile: user.mobile,
    hasVerifiedEmail: user.hasVerifiedEmail,
    hasVerifiedPhone: user.hasVerifiedPhone,
    emailVerificationToken: user.emailVerificationToken,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });

  return {
    async loginUser(req, res, next) {
      try {
        const { mobile, password } = req.body;

        const userWithPhone = await dataSource.fetchOneUser(
          formatPhone(mobile)
        );
        if (!userWithPhone) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "User with that phone number does not exist"
          );
        }

        const userPassword = userWithPhone?.password ?? userWithPhone?.Password;

        if (!hash.compareHashAndString(userPassword, password)) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "Incorrect login"
          );
        }

        const payload = userWithPhone?.toJSON
          ? extractUserInfo(userWithPhone.toJSON())
          : userWithPhone;

        const token = createHashedToken(payload);

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Logged in successfully",
          token,
          payload,
        });
      } catch (error) {
        return next(error);
      }
    },

    async registerUser(req, res, next) {
      try {
        const { firstName, lastName, email, mobile, password } = req.body;

        const userWithPhone = await dataSource.fetchOneUser(
          formatPhone(mobile)
        );
        if (userWithPhone) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "User with similar phone number/email exists"
          );
        }

        const newUserSchema = new User(
          firstName,
          lastName,
          email,
          mobile,
          password
        );
        let response = await dataSource.createUser(newUserSchema);
        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while creating users"
          );
        }

        const userId = response?.userId ?? newUserSchema?.userId;
        if (response?.toJSON) {
          response = extractUserInfo(response.toJSON());
        }

        const emailResponse = await sendEmail({
          receipientEmail: response?.email ?? newUserSchema?.email,
          subject: "Welcome To Gh Schools",
          content: UserVerificationMailContent(
            response?.firstName ?? newUserSchema?.firstName,
            response?.lastName ?? newUserSchema?.lastName,
            null,
            `${process.env.APP_BASE_URL}/verify?Id=${userId}`
          ),
        });

        console.log(emailResponse);

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Successful",
          payload: response,
          onboarded: false,
        });
      } catch (error) {
        return next(error);
      }
    },

    async getUserProfile(req, res, next) {
      try {
        const { userId } = req.user;

        const user = await dataSource.fetchOneUser(userId);
        if (!user) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Authenticated user does not exist"
          );
        }

        const payload =
          "toJSON" in user ? extractUserInfo(user.toJSON()) : user;

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "User found successfully",
          payload,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
