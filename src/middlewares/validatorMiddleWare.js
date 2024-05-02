const { body, validationResult } = require("express-validator");
// const Patterns = require("../constants/patterns");
const SendResponses = require("../utils/sendAPIResponses");

const { sendErrorResponse } = SendResponses;
const sqlInjectionSanitizer = (value) =>
  !value ? value : value.replace(/--/g, "");
const sqlInjectionValidator = (value) =>
  !value ? !!value : value.match(/--/g) === null;

/**
 * @class
 * @name ValidatorMiddleWare
 */
const validatorMiddleWare = {
  validateSignUp: [
    body("email", "please enter a valid email")
      .trim()
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .custom(sqlInjectionValidator)
      .withMessage("Unacceptable character '--' found"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("passwords length must be between 8 to 24")
      .custom(sqlInjectionValidator)
      .withMessage("Unacceptable character '--' found")
  ],

  validateLogin: [
    body("phone")
      .optional()
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 8, max: 20 })
      .customSanitizer((value) =>
        value ? value.replace(/\+234/g, "0") : value
      ),
    body("email")
      .optional()
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail()
      .withMessage("please enter a valid email")
      .custom(sqlInjectionValidator)
      .withMessage("Unacceptable character '--' found"),
  ],

  validatePasswordUpdate: [
    body("newPassword")
      .trim()
      .isLength({ min: 8 })
      .withMessage("passwords length must be between 8 to 24")
      .custom(sqlInjectionValidator)
      .withMessage("Unacceptable character '--' found"),
    body("confirmPassword")
      .trim()
      .custom(sqlInjectionValidator)
      .withMessage("Unacceptable character '--' found")
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage("password fields do not match"),
  ],

  validateProfileUpdate: [
    body("phone")
      .optional()
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 8, max: 20 })
      .customSanitizer((value) =>
        value ? value.replace(/\+234/g, "0") : value
      ),
    body("firstname")
      .optional()
      .trim()
      .escape()
      .isAlpha("en-US", { ignore: /(\s+)|-|(\d+)/g })
      .isLength({ min: 3 })
      .toLowerCase(),
    body("lastname")
      .optional()
      .trim()
      .escape()
      .isAlpha("en-US", { ignore: /(\s+)|-|(\d+)/g })
      .isLength({ min: 3 })
      .toLowerCase(),
    body("bankCode")
      .optional()
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 3 }),
    body("accountNumber")
      .optional()
      .trim()
      .escape()
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage("accountNumber must be 10 digits"),
    body("dailyLimit").optional().trim().escape().isNumeric().toFloat(),
  ],

  optionalGameValidation: [
    body("tenantId").optional(),
    body("startTime").optional(),
    body("mrf")
      .optional()
      .isAlphanumeric()
      .withMessage("mrf can only contain alphabets and numbers")
      .isLength({ min: 5, max: 5 })
      .withMessage("mrf must be 5 characters")
      .toUpperCase(),
    body("totalFundPool")
      .optional()
      .isNumeric()
      .withMessage("Expected numeric value")
      .toFloat(),
    body("alternateStartDate")
      .optional()
      .custom((value) => {
        const isISODateString =
          !!value &&
          value.match(PatternTemplates.iso_string_date_pattern) !== null;
        return isISODateString;
      })
      .withMessage("alternateStartDate must be in ISO date format")
      .trim(),
  ],

  /**
   * @param {string} aliasedName
   * @returns Any
   */
  handleAliases(aliasedName) {
    // console.log(`handling alias ${aliasedName}`);
    /*
      ALIASED_PARAM_VALIDATIONS contains validators for parameters with a
      different name (alias) not in KNOWN_PARAMETERS
    */
    const ALIASED_PARAM_VALIDATIONS = {
      uuid: body(aliasedName)
        .exists()
        .withMessage(`${aliasedName} parameter required`)
        .custom((value) => {
          const containsAlphabetNumber =
            !!value && value.match(/(\w+\d+)+/g) !== null;
          return containsAlphabetNumber;
        })
        .customSanitizer((value) =>
          !value ? value : value.replace(/[–]/g, "-")
        )
        .isLength({ min: 36, max: 36 }),
      name: body(aliasedName)
        .exists()
        .withMessage(`${aliasedName} parameter required`)
        .trim()
        .escape()
        .isAlpha("en-US", { ignore: /(\s+)|(-)|(\d+)/g })
        .withMessage(`Invalid value for ${aliasedName}`)
        .isLength({ min: 3 })
        .toLowerCase(),
      boolean: body(aliasedName)
        .exists()
        .withMessage(`${aliasedName} parameter required`)
        .isBoolean()
        .withMessage(`${aliasedName} must be a boolean`),
    };

    // Defines conditions for parameter to be an alias of name
    const isUuidAlias =
      aliasedName.toLowerCase() === "userid" ||
      aliasedName.toLowerCase() === "gameid" ||
      aliasedName.toLowerCase() === "lotteryid" ||
      aliasedName.toLowerCase() === "adminid";

    // Defines conditions for parameter to be an alias of name
    const isNameAlias =
      aliasedName.toLowerCase() === "firstname" ||
      aliasedName.toLowerCase() === "lastname";

    const isBooleanType = aliasedName === "status";

    // Use name validation if parameter is an alias of name
    if (isUuidAlias === true) return ALIASED_PARAM_VALIDATIONS.uuid;
    // Use name validation if parameter is an alias of name
    if (isNameAlias === true) return ALIASED_PARAM_VALIDATIONS.name;
    // Use boolean validation if parameter is expected to be boolean
    if (isBooleanType === true) return ALIASED_PARAM_VALIDATIONS.boolean;

    // Else, just return validator to test existence of this aliased parameter in request
    return body(aliasedName)
      .exists()
      .withMessage(`${aliasedName} parameter required`);
  },

  /**
   * @param {Array} params
   * @returns Any
   */
  selectValidation(...params) {
    // params is an array of arguments which specify the parameters to validate in the request
    // VALIDATION_CHAIN is the final array of validators that would be passed to express validator
    const VALIDATION_CHAIN = [];
    // KNOWN_PARAMETERS is an array of all defined parameters used in the app
    const KNOWN_PARAMETERS = [
      "userId",
      "name",
      "email",
      "slug",
      "password",
      "mobile",
      "amount",
      "accountNumber",
    ];

    // PARAMETER_VALIDATIONS contains all KNOWN_PARAMETERS and their required validations
    const PARAMETER_VALIDATIONS = {
      userId: body("userId")
        .exists()
        .withMessage("userId parameter required")
        .notEmpty()
        .custom((value) => {
          const containsAlphabetNumber =
            !!value && value.match(/(\w+\d+)+/g) !== null;
          return containsAlphabetNumber;
        })
        .customSanitizer((value) =>
          !value ? value : value.replace(/[–]/g, "-")
        )
        .isLength({ min: 36, max: 36 }),
      name: body("name")
        .exists()
        .withMessage("name parameter required")
        .trim()
        .escape()
        .isAlpha("en-US", { ignore: /\s+|-|(\d+)/g })
        .withMessage("only alphabets allowed")
        .isLength({ min: 3 })
        .toLowerCase(),
      mobile: body("mobile")
        .exists()
        .withMessage("mobile parameter required")
        .trim()
        .escape()
        .isNumeric()
        .isLength({ min: 8, max: 20 })
        .customSanitizer((value) =>
          value ? value.replace(/\+234/g, "0") : value
        ),
      password: body("password")
        .exists()
        .withMessage("password parameter required")
        .trim()
        .custom(sqlInjectionValidator)
        .withMessage("Unacceptable character '--' found"),
      email: body("email")
        .exists()
        .withMessage("email parameter required")
        .normalizeEmail({ gmail_remove_dots: false })
        .isEmail()
        .withMessage("please enter a valid email")
        .customSanitizer(sqlInjectionSanitizer),
      amount: body("amount")
        .isNumeric()
        .withMessage("Invalid value for amount parameter")
        .toFloat()
        .custom((value) => value >= 1)
        .withMessage("Minimum amount is 1.00"),
      accountNumber: body("accountNumber")
        .exists()
        .withMessage("accountNumber parameter required")
        .trim()
        .isNumeric()
        .withMessage("accountNumber parameter must be numeric")
        .isLength({ min: 10, max: 10 })
        .withMessage("accountNumber must be 10 digits long"),
      slug: body("slug")
        .exists()
        .withMessage("slug parameter required")
        .trim()
        .toLowerCase()
        .isLength({ min: 3 })
        .withMessage("slug must be more than 3 characters long")
        .isSlug(),
    };

    params.forEach((eachParam) => {
      // Checks if the parameter = require(request is in KNOWN_PARAMETERS
      // eslint-disable-next-line max-len
      const isInKnownParameters =
        KNOWN_PARAMETERS.findIndex(
          (eachKnownParam) => eachKnownParam === eachParam
        ) > -1;
      /*
        if parameter from request is in KNOWN_PARAMETERS, add the corresponding
        validator to VALIDATION_CHAIN.
        Else if parameter from request is not in KNOWN_PARAMETERS, check if parameter
        is just another name for a known parameter (alias) and add returned validator
        to VALIDATION_CHAIN.
      */
      VALIDATION_CHAIN.push(
        isInKnownParameters
          ? PARAMETER_VALIDATIONS[eachParam]
          : this.handleAliases(eachParam)
      );
    });

    return VALIDATION_CHAIN;
  },

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {import('express').NextFunction} next
   * @returns Any
   */
  validateRequest(req, res, next) {
    const errors = validationResult(req);
    const errorObject = errors.array()[0];
    return errors.isEmpty() ? next() : sendErrorResponse(res, 422, errorObject);
  },
};

module.exports = validatorMiddleWare;
