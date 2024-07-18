const User = require("../schemas/UserSchema");
const {
  UserVerificationMailContent,
  ResetPasswordMailContent,
} = require("../views/HtmlViews");
const {
  hash,
  dataSource,
  StatusCodes,
  createHashedToken,
  verifyHashedToken,
  sendErrorResponse,
  sendSuccessResponse,
  sendEmail,
  formatPhone,
} = require("./imports");

const Controllers = function () {
  const extractUserInfo = (user) => ({
    userId: user.userId ?? user.UserID,
    firstName: user.firstName ?? user.FirstName,
    lastName: user.lastName ?? user.LastName,
    email: user.email ?? user.Email,
    mobile: user.mobile ?? user.Mobile,
    sex: user.sex ?? user.Sex,
    dob: user.dob ?? user.DoB,
    role: user.role ?? user.Role,
    avatarUrl: user.avatarUrl ?? user.AvatarUrl,
    nationality: user.nationality ?? user.Nationality,
    hasVerifiedEmail: user.hasVerifiedEmail ?? user.HasVerifiedEmail,
    hasVerifiedPhone: user.hasVerifiedPhone ?? user.HasVerifiedPhone,
    hasMedicalCondition: user.hasMedicalCondition ?? user.HasMedicalCondition,
    medicalCondition: user.medicalCondition ?? user.MedicalCondition,
    hasDisability: user.hasDisability ?? user.HasDisability,
    disability: user.disability ?? user.Disability,
    emailVerificationToken:
      user.emailVerificationToken ?? user.EmailVerificationToken,
    isActive: user.isActive ?? user.IsActive,
    createdAt: user.createdAt ?? user.CreatedAt,
    updatedAt: user.updatedAt ?? user.UpdatedAt,
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
          : extractUserInfo(userWithPhone);

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

    async resetPassword(req, res, next) {
      try {
        const { mobile } = req.body;

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

        const token = createHashedToken(
          { userId: userWithPhone.userId ?? userWithPhone?.UserID },
          "3h"
        );

        console.log(token);

        const passwordResetLink = `${process.env.APP_BASE_URL}/portal/password/create-new?token=${token}`;

        const emailRes = await sendEmail({
          receipientEmail: userWithPhone?.email ?? userWithPhone?.Email,
          subject: "Reset Password Confirmation",
          content: ResetPasswordMailContent(
            `${userWithPhone?.firstName ?? userWithPhone?.FirstName} ${
              userWithPhone?.lastName ?? userWithPhone?.LastName
            }`,
            passwordResetLink
          ),
        });

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Email sent successfully",
          payload: {
            emailRes,
            link: passwordResetLink
          }
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
    async completePasswordReset(req, res, next) {
      try {
        let payload = null;
        const { newPassword, token } = req.body;

        try {
          payload = verifyHashedToken(token, "3h");
        } catch (error) {
          console.error(error);
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "Invalid token"
          );
        }

        console.log(payload);

        const userId = payload?.userId ?? payload?.UserID;
        if (!payload || !userId) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "Invalid token"
          );
        }

        const validUser = await dataSource.fetchOneUser(userId);
        if (!validUser) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "User not found"
          );
        }

        const passwordUpdateResult = await dataSource.updateUser(userId, {
          password: hash.encryptV2(newPassword),
        });
        if (!passwordUpdateResult) {
          return sendErrorResponse(
            res,
            StatusCodes.INTERNAL_SERVER,
            "An error occured"
          );
        }

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Password Reset Successfully",
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
