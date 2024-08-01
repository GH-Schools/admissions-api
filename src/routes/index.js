const router = require("express").Router();
const apikeyMid = require("../middlewares/apikeyMid");
const authMid = require("../middlewares/authMid");
const upload = require("../middlewares/multerMiddleware");
const controllers = require("../controllers");
const validatorMiddleWare = require("../middlewares/validatorMiddleWare");

router.get("/health-check", apikeyMid, controllers.healthCheck);
router.post(
  "/upload",
  apikeyMid,
  authMid,
  upload.single("image"),
  controllers.upload
);

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

router.post(
  "/admin/login",
  apikeyMid,
  validatorMiddleWare.validateLogin,
  validatorMiddleWare.validateRequest,
  controllers.loginAdmin
);

router.get("/get-profile", apikeyMid, authMid, controllers.getUserProfile);

router.get("/user/get-users", apikeyMid, authMid, controllers.getAllUsers);

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
  "/admissions/save-personal-profile",
  apikeyMid,
  authMid,
  validatorMiddleWare.selectValidation(
    "reference",
    "firstName",
    "middleName",
    "lastName",
    "email",
    "mobile1",
    "dob",
    "sex",
    "currentJob",
    "language",
    // "passportPhoto",
    "residentialAddress",
    "nationality",
    "regionOfResidence",
    "nationalIDType",
    "nationalIDNumber"
  ),
  validatorMiddleWare.validateRequest,
  controllers.saveAdmissionPersonalProfile
);

router.post(
  "/admissions/save-education",
  apikeyMid,
  authMid,
  validatorMiddleWare.selectValidation(
    "nameOfSchoolAttended1",
    "locationOfSchoolAttended1",
    "yearAttended1",
    "qualification1",
    "preferredCourse",
    "courseSession",
    "priorExperience",
    "priorExperienceSpecialization",
    "source",
    "reference"
    // "mobile2",
  ),
  validatorMiddleWare.validateRequest,
  controllers.saveAdmissionFormEducation
);

router.post(
  "/admissions/save-welfare-information",
  apikeyMid,
  authMid,
  validatorMiddleWare.selectValidation(
    "preferHostel",
    "hasMedicalCondition",
    "medicalCondition",
    "hasDisability",
    "disability",
    "sponsorName",
    "sponsorRelationship",
    "sponsorOccupation",
    "sponsorAddress",
    "sponsorMobile",
    "reference"
  ),
  validatorMiddleWare.validateRequest,
  controllers.saveAdmissionWelfareInformation
);

router.put(
  "/admissions/update-form",
  apikeyMid,
  authMid,
  validatorMiddleWare.selectValidation("formId", "userId"),
  validatorMiddleWare.validateRequest,
  controllers.updateAdmissionForm
);

router.get(
  "/admissions/get-all-forms",
  apikeyMid,
  authMid,
  controllers.getAllAdmissionForms
);

router.get(
  "/admissions/get-admissions-form/:searchParam",
  apikeyMid,
  authMid,
  controllers.getAdmissionForm
);

router.post(
  "/admissions/download",
  apikeyMid,
  authMid,
  validatorMiddleWare.selectValidation("formId"),
  validatorMiddleWare.validateRequest,
  controllers.downloadAdmissionForm
);

module.exports = router;
