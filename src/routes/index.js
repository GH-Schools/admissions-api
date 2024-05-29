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

router.post(
  "/auth/reset-password",
  apikeyMid,
  validatorMiddleWare.selectValidation("mobile"),
  validatorMiddleWare.validateRequest,
  controllers.resetPassword
);

router.put(
  "/auth/complete-password-reset",
  validatorMiddleWare.selectValidation("token"),
  validatorMiddleWare.validatePasswordUpdate,
  validatorMiddleWare.validateRequest,
  controllers.completePasswordReset
);

router.get("/get-profile", apikeyMid, authMid, controllers.getUserProfile);

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
  validatorMiddleWare.selectValidation(
    "firstName",
    "lastName",
    "mobile",
    "reference",
    "amount"
  ),
  validatorMiddleWare.validateRequest,
  controllers.paymentWebhook
);

// SESSIONS
router.post(
  "/session/create-session",
  apikeyMid,
  // authMid,
  validatorMiddleWare.selectValidation("title"),
  validatorMiddleWare.validateRequest,
  controllers.registerNewSession
);

router.get(
  "/session/get-current-session",
  apikeyMid,
  controllers.getCurrentSession
);

// ADMISSIONS
router.post(
  "/admissions/new-form",
  apikeyMid,
  authMid,
  validatorMiddleWare.selectValidation(
    "firstName",
    "middleName",
    "lastName",
    "email",
    "passportPhoto",
    "residentialAddress",
    "regionOfResidence",
    "sex",
    "dob",
    "nationality",
    "mobile1",
    "mobile2",
    "nationalIDType",
    "nationalIDNumber",
    "currentJob",
    "language",
    "nameOfSchoolAttended1",
    "locationOfSchoolAttended1",
    "yearAttended1",
    "qualification1",
    "nameOfSchoolAttended2",
    "locationOfSchoolAttended2",
    "yearAttended2",
    "qualification2",
    "nameOfSchoolAttended3",
    "locationOfSchoolAttended3",
    "yearAttended3",
    "qualification3",
    "preferredCourse",
    "session",
    "preferHostel",
    "hasMedicalCondition",
    "medicalCondition",
    "hasDisability",
    "disability",
    "source",
    "priorExperience",
    "priorExperienceSpecialization",
    "sponsorName",
    "sponsorRelationship",
    "sponsorOccupation",
    "sponsorAddress",
    "sponsorMobile",
    "reference",
  ),
  validatorMiddleWare.validateRequest,
  controllers.newAdmission
);

router.get(
  "/admissions/get-all-forms",
  apikeyMid,
  authMid,
  controllers.getAdmissionForm
);

router.get(
  "/admissions/get-admissions-form/:searchParam",
  apikeyMid,
  authMid,
  controllers.getAdmissionForm
);

module.exports = router;
