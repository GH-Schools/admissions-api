const { Op } = require("sequelize");
const models = require("../../models/index");
const patterns = require("../constants/patterns");
const googleService = require("../utils/googleServices");
const hash = require("../utils/hash");
const { User, Payments, Session } = models;

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
     * payId: string;
     * userId: string;
     * sessionId: string;
     * reference: string;
     * amount: string | number;
     * isActive: boolean;
     * deleted: boolean;
     * createdAt: Date;
     * updatedAt: Date;
     * }} payload
     * @returns
     */
    async createPaymentRecord({
      payId,
      createdAt,
      updatedAt,
      isActive = true,
      ...restOfPayload
    }) {
      return Payments.create({
        isActive,
        ...restOfPayload,
      });
    },

    /**
     * Finds a payment record
     * @param {string} reference
     * @param {string | null} [userId=null]
     * @param {string} [sessionId]
     * @returns
     */
    async fetchOnePayment(reference, userId, sessionId) {
      const filterConditions = {};

      if (userId) {
        filterConditions.userId = userId;
      }

      if (sessionId) {
        filterConditions.sessionId = sessionId;
      }

      return Payments.findOne({
        where: {
          ...filterConditions,
          [Op.or]: this.UUIDOrStringTypeConditionSelector(
            reference,
            [{ reference }],
            [{ userId: reference }, { payId: reference }]
          ),
        },
      });
    },

    /**
     * Finds all payment record
     * @param {{}} filters
     * @param {string} [userId]
     * @returns
     */
    async fetchAllPayments(filters, userId) {
      const filterConditions = {};

      if (userId) {
        filterConditions.userId = userId;
      }

      if (filters?.sessionId) {
        filterConditions.sessionId = filters?.sessionId;
      }

      const offset = filters.page < 1 ? 1 : filters.page - 1;
      const { limit } = filters;

      return Payments.findAndCountAll({
        where: {
          ...filterConditions,
        },
        include: [
          {
            model: "User",
            attributes: { exclude: ["password"] },
          },
        ],
        limit:
          limit && typeof limit === "number" && !Number.isNaN(limit)
            ? limit
            : undefined,
        offset: offset * (limit || 1),
      });
    },

    /**
     * Adds a new session record
     * @param {{
     * sessionId: string;
     * title: string;
     * startDate?: Date;
     * endDate?: Date;
     * details?: string;
     * isActive: boolean;
     * deleted: boolean;
     * createdAt: Date;
     * updatedAt: Date;
     * }} payload
     * @returns
     */
    async addNewSession({
      sessionId,
      createdAt,
      updatedAt,
      isActive = true,
      ...restOfPayload
    }) {
      return Session.create({
        isActive,
        ...restOfPayload,
      });
    },

    /**
     * Finds a session record
     * @param {string} sessionId
     * @returns
     */
    async fetchOneSession(sessionId) {
      return Session.findOne({
        where: {
          sessionId,
        },
      });
    },

    /**
     * Finds the most recent session record
     * @returns
     */
    async fetchCurrentSession() {
      return Session.findOne({
        where: {
          isActive: true,
        },
      });
    },
  };
};

module.exports = DataRepo();
