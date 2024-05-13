const router = require("express").Router();
const apikeyMid = require("../middlewares/apikeyMid");
const authMid = require("../middlewares/authMid");
const controllers = require("../controllers");
const validatorMiddleWare = require("../middlewares/validatorMiddleWare");

router.get("/health-check", apikeyMid, controllers.healthCheck);

router.post(
  "/auth/login",
  apikeyMid,
  validatorMiddleWare.validateLogin,
  validatorMiddleWare.validateRequest,
  controllers.loginUser
);

router.post(
  "/auth/register",
  apikeyMid,
  validatorMiddleWare.validateSignUp,
  validatorMiddleWare.selectValidation("firstName", "lastName", "mobile"),
  validatorMiddleWare.validateRequest,
  controllers.registerUser
);

router.get(
  "/get-profile",
  apikeyMid,
  authMid,
  controllers.getUserProfile
);

router.get(
  "/payment/get-my-payments",
  apikeyMid,
  authMid,
  controllers.getAllUserPayments
);

router.post(
  "/payment/verify-payment-by-mobile",
  apikeyMid,
  validatorMiddleWare.selectValidation("mobile"),
  validatorMiddleWare.validateRequest,
  controllers.verifyPaymentByMobile
);

router.post(
  "/payment/verify-payment-by-reference",
  apikeyMid,
  validatorMiddleWare.selectValidation("reference"),
  validatorMiddleWare.validateRequest,
  controllers.verifyPaymentByReference
);

router.post(
  "/payment/success-webhook",
  apikeyMid,
  validatorMiddleWare.selectValidation("firstName", "lastName", "mobile", "reference", "amount"),
  validatorMiddleWare.validateRequest,
  controllers.paymentWebhook
);

// SESSIONS
router.post(
  "/session/create-session",
  apikeyMid,
  authMid,
  validatorMiddleWare.selectValidation("title"),
  validatorMiddleWare.validateRequest,
  controllers.registerNewSession
);

router.get(
  "/session/get-current-session",
  apikeyMid,
  controllers.getCurrentSession
);

module.exports = router;
