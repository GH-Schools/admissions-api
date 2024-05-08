const User = require("../schemas/User");
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

const Controllers = function () {
  return {
    async paymentWebhook(req, res, next) {
      try {
        const { firstName, lastName, mobile, reference } = req.body;

        let onboarded = false;
        let userWithPhone = await dataSource.fetchOneUser(formatPhone(mobile));
        const generatedPassword = generateRandomCharacters(8);
  
        if (!userWithPhone) {
          const newUser = new User(
            firstName,
            lastName,
            "gofrance01@gmail.com",
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
  
          await sendEmail({
            receipientEmail: userWithPhone?.email ?? userWithPhone?.Email,
            subject: "Welcome To Gh Schools",
            content: UserVerificationMailContent(
              userWithPhone?.firstName ?? userWithPhone?.FirstName,
              userWithPhone?.lastName ?? userWithPhone?.LastName,
              (onboarded ? generatedPassword : null),
              `${process.env.APP_BASE_URL}/verify?Id=${userId}`
            ),
          });

          userWithPhone = createAccountResponse?.toJSON
            ? createAccountResponse?.toJSON()
            : newUser;
        }

        // FIND PAYMENT RECORD BY REFERENCE
        const userId = userWithPhone?.userId ?? userWithPhone?.UserID;
        const payRecord = await dataSource.fetchOnePayment(reference, userId);
        // const payRecordUserId = payRecord?.userId ?? payRecord?.UserID;
        // console.log(payRecord, userId, payRecordUserId);

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
          new PaymentSchema(userId, reference)
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
          onboarded
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
