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

router.post(
  "/payment/success-webhook",
  apikeyMid,
  validatorMiddleWare.selectValidation("firstName", "lastName", "mobile", "reference"),
  validatorMiddleWare.validateRequest,
  controllers.paymentWebhook
);

module.exports = router;
