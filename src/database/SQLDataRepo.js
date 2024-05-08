const { Op } = require("sequelize");
const models = require("../../models/index");
const patterns = require("../constants/patterns");
const googleService = require("../utils/googleServices");
const hash = require("../utils/hash");
const { User, Payments } = models;

const DataRepo = function () {
  return {
    async test() {
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheet({
        auth,
      });
      return response?.data;
    },

    /**
     * @param {string | number | boolean} queryParam
     * @param {any[]} stringConditions
     * @param {any[]} uuidConditions
     * @returns any[]
     */
    UUIDOrStringTypeConditionSelector(
      queryParam,
      stringConditions,
      uuidConditions
    ) {
      // const isUUID = PatternTemplates.uuidV4Pattern.test(queryParam);
      const isUUID =
        typeof queryParam === "string" &&
        !!(queryParam || "").match(patterns.uuidV4Pattern);
      return isUUID ? uuidConditions : stringConditions;
    },

    /**
     * Adds a new user
     * @param {{
     * firstName: string;
     * lastName: string;
     * mobile: string;
     * email: string;
     * password: string;
     * role: 'STUDENT';
     * hasVerifiedEmail: boolean;
     * emailVerificationToken: string;
     * hasVerifiedPhone: boolean;
     * }} payload
     * @returns
     */
    async createUser({
      firstName,
      lastName,
      mobile,
      email,
      password,
      role,
      hasVerifiedEmail = false,
      emailVerificationToken,
      hasVerifiedPhone = false,
      isActive = true,
    }) {
      const payload = {
        firstName,
        lastName,
        mobile,
        email,
        role,
        password,
        hasVerifiedEmail,
        emailVerificationToken,
        hasVerifiedPhone,
        isActive,
      };

      return User.create(payload);
    },

    /**
     * Finds a user
     * @param {string} searchParam
     * @returns
     */
    async fetchOneUser(searchParam) {
      return User.findOne({
        where: {
          [Op.or]: this.UUIDOrStringTypeConditionSelector(
            searchParam,
            [{ email: searchParam }, { mobile: searchParam }],
            [{ userId: searchParam }]
          ),
        },
      });
    },

    /**
     * Adds a new payment record
     * @param {{
     * userId: string;
     * reference: string;
     * isActive: boolean;
     * deleted: boolean;
     * }} payload
     * @returns
     */
    async createPaymentRecord({ userId, reference, isActive = true, deleted }) {
      return Payments.create({
        userId,
        reference,
        isActive,
        deleted,
      });
    },

    /**
     * Finds a payment record
     * @param {string} reference
     * @param {string | null} [userId=null] 
     * @returns
     */
    async fetchOnePayment(reference, userId) {
      return Payments.findOne({
        where: {
          userId,
          [Op.or]: this.UUIDOrStringTypeConditionSelector(
            reference,
            [{ reference }],
            [{ userId: reference }, { payId: reference }]
          ),
        },
      });
    },
  };
};

module.exports = DataRepo();
