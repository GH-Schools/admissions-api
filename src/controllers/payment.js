const User = require("../schemas/UserSchema");
const PaymentSchema = require("../schemas/PaymentSchema");
const { UserVerificationMailContent } = require("../views/HtmlViews");
const {
  sendSuccessResponse,
  sendErrorResponse,
  formatPhone,
  StatusCodes,
  dataSource,
  generateRandomCharacters,
  sendEmail,
} = require("./imports");
const { mapAsFilters } = require("../utils/helpers");

const Controllers = function () {
  return {
    async paymentWebhook(req, res, next) {
      try {
        const {
          firstName,
          lastName,
          email = process.env.MAIL_SENDER_EMAIL,
          mobile,
          reference,
          amount,
        } = req.body;
        // console.log(req.body);

        const currentSession = await dataSource.fetchOneSession();
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        let onboarded = false;
        let userWithPhone = await dataSource.fetchOneUser(formatPhone(mobile));
        const generatedPassword = generateRandomCharacters(8);

        if (!userWithPhone) {
          const newUser = new User(
            firstName,
            lastName,
            email,
            mobile,
            generatedPassword
          );

          const createAccountResponse = await dataSource.createUser(newUser);

          if (!createAccountResponse) {
            return sendErrorResponse(
              res,
              StatusCodes.SERVER_ERROR,
              "An error occured while saving account"
            );
          }

          onboarded = true;
          userWithPhone = createAccountResponse?.toJSON
            ? createAccountResponse?.toJSON()
            : newUser;

          await sendEmail({
            receipientEmail: userWithPhone?.email ?? userWithPhone?.Email,
            subject: "Welcome To Gh Schools",
            content: UserVerificationMailContent(
              userWithPhone?.firstName ?? userWithPhone?.FirstName,
              userWithPhone?.lastName ?? userWithPhone?.LastName,
              onboarded ? generatedPassword : null,
              `${process.env.APP_BASE_URL}/verify?Id=${
                userWithPhone?.userId ?? userWithPhone?.UserID
              }`
            ),
          });
        }

        // FIND PAYMENT RECORD BY REFERENCE
        const userId = userWithPhone?.userId ?? userWithPhone?.UserID;
        const sessionId =
          currentSession?.sessionId ?? currentSession?.SessionID;

        const payRecord = await dataSource.fetchOnePayment(
          userId,
          userId,
          sessionId
        );

        // CHECK THAT THIS REFERENCE IS NOT BEING INSERTED TWICE FOR SAME USER
        if (payRecord) {
          return sendErrorResponse(
            res,
            StatusCodes.BAD_REQUEST,
            "Payment already exists for this user"
          );
        }

        // CREATE A UNIQUE PAYMENT RECORD
        const response = await dataSource.createPaymentRecord(
          new PaymentSchema(userId, sessionId, reference, amount)
        );

        if (!response) {
          return sendErrorResponse(
            res,
            StatusCodes.SERVER_ERROR,
            "An error occured while creating payment"
          );
        }

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Triggered Successfully",
          payload: response,
          onboarded,
        });
      } catch (error) {
        return next(error);
      }
    },

    async verifyPaymentByMobile(req, res, next) {
      try {
        const { mobile } = req.body;

        const currentSession = await dataSource.fetchOneSession();
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        let userWithPhone = await dataSource.fetchOneUser(formatPhone(mobile));
        if (!userWithPhone) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Mobile number not found"
          );
        }

        // FIND PAYMENT RECORD BY REFERENCE
        const userId = userWithPhone?.userId ?? userWithPhone?.UserID;
        const sessionId =
          currentSession?.sessionId ?? currentSession?.SessionID;

        // CHECK FOR PAYMENT RECORD USING USERID AND SESSIONID
        const payRecord = await dataSource.fetchOnePayment(
          userId,
          userId,
          sessionId
        );

        if (!payRecord) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No payment record found for this user"
          );
        }

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Found Successfully",
          payload: payRecord,
        });
      } catch (error) {
        return next(error);
      }
    },

    async verifyPaymentByReference(req, res, next) {
      try {
        const { reference } = req.body;

        const currentSession = await dataSource.fetchOneSession();
        if (!currentSession) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No ongoing session found"
          );
        }

        const sessionId =
          currentSession?.sessionId ?? currentSession?.SessionID;

        // FIND PAYMENT RECORD BY REFERENCE
        const payRecord = await dataSource.fetchOnePayment(
          reference,
          null,
          sessionId
        );

        if (!payRecord) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No payment record with this reference found"
          );
        }

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Found Successfully",
          payload: payRecord,
        });
      } catch (error) {
        return next(error);
      }
    },

    async getAllUserPayments(req, res, next) {
      try {
        let { userId } = req.user;

        let authUser = await dataSource.fetchOneUser(userId);
        if (!authUser) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "Authenticated user info not found"
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
        userId = authUser?.userId ?? authUser?.UserID;
        const sessionId =
          currentSession?.sessionId ?? currentSession?.SessionID;

        // CHECK FOR PAYMENT RECORD USING USERID AND SESSIONID
        const filters = mapAsFilters({ sessionId, ...req.query });
        const payRecord = await dataSource.fetchAllPayments(filters, userId);

        if (!payRecord) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "No payment record found for this user"
          );
        }

        const { rows, count } = payRecord;

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Found Successfully",
          totalCount: count,
          payload: rows,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
