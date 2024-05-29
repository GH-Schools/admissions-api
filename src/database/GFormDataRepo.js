const googleService = require("../utils/googleServices");
const hash = require("../utils/hash");

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
     * Adds a new user
     * @param {{
     * firstName: string;
     * lastName: string;
     * mobile: string;
     * email: string;
     * password: string;
     * hasVerifiedEmail: boolean;
     * emailVerificationToken: string;
     * hasVerifiedPhone: boolean;
     * phoneVerificationToken: string;
     * }} payload
     * @returns
     */
    async createUser({
      userId,
      firstName,
      lastName,
      mobile,
      email,
      password,
      hasVerifiedEmail = false,
      emailVerificationToken,
      hasVerifiedPhone = false,
      phoneVerificationToken,
      isActive = true,
      deleted,
      createdAt,
      updatedAt,
    }) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "UserInfo",
        values: [
          [
            userId,
            firstName,
            "",
            lastName,
            email,
            mobile,
            "",
            password,
            hasVerifiedEmail,
            emailVerificationToken,
            hasVerifiedPhone,
            phoneVerificationToken,
            "",
            "",
            "",
            isActive,
            "",
            false,
            "",
            false,
            "",
            deleted,
            createdAt,
            updatedAt,
          ],
        ],
      });

      return response?.data?.updates?.updatedRows;
    },

    /**
     * Finds a user
     * @param {string} searchParam
     * @param {string} [auth]
     * @returns
     */
    async fetchOneUser(searchParam, auth) {
      auth = auth ?? (await googleService.getAuthToken());
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "UserInfo",
      });

      if (response?.data) {
        const { values } = response.data;
        const users = googleService.mapValuesToObject(values);
        return users.find((user) => {
          return [user["Email"], user["Mobile"], user["UserID"]].includes(
            searchParam
          );
        });
      }

      return response?.data;
    },

    /**
     * Updates a user
     * @param {string} userId
     * @param {{}} payload
     * @param {string} [auth]
     * @returns
     */
    async updateUser(userId, payload, auth) {
      auth = auth ?? (await googleService.getAuthToken());
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "UserInfo",
      });

      if (response?.data) {
        const { values } = response.data;
        const users = googleService.mapValuesToObject(values);
        return users.find((user) => {
          return [user["Email"], user["Mobile"], user["UserID"]].includes(
            userId
          );
        });
      }

      return response?.data;
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
     * @param {string} [auth] google auth string
     * @returns
     */
    async createPaymentRecord(
      {
        payId,
        userId,
        amount,
        sessionId,
        reference,
        isActive,
        deleted,
        createdAt,
        updatedAt,
      },
      auth
    ) {
      auth = auth ?? (await googleService.getAuthToken());
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "PaymentRefs",
        values: [
          [
            payId,
            userId,
            amount,
            reference,
            sessionId,
            isActive,
            deleted,
            createdAt,
            updatedAt,
          ],
        ],
      });
      return response?.data?.updates?.updatedRows;
    },

    /**
     * Finds a payment record
     * @param {string} reference
     * @param {string} [userId]
     * @param {string} [sessionId]
     * @returns
     */
    async fetchOnePayment(reference, userId, sessionId) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "PaymentRefs",
      });

      if (response?.data) {
        const { values } = response.data;
        const payments = googleService.mapValuesToObject(values);
        return payments.find((payment) => {
          let filterCondition = true;

          if (userId) {
            filterCondition &&= payment["UserID"] === userId;
          }

          if (sessionId) {
            filterCondition &&= payment["SessionID"] === sessionId;
          }

          // console.log({
          //   reference,
          //   userId,
          //   sessionId,
          //   payment,
          //   a: filterCondition,
          //   b: [
          //     payment["PayID"],
          //     payment["Reference"],
          //     payment["UserID"],
          //   ].includes(reference),
          // });

          return (
            filterCondition &&
            [
              payment["PayID"],
              payment["Reference"],
              payment["UserID"],
            ].includes(reference)
          );
        });
      }

      return response?.data;
    },

    /**
     * Finds all payment record
     * @param {{}} filters
     * @param {string} [userId]
     * @returns
     */
    async fetchAllPayments(filters, userId) {
      const context = this;
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "PaymentRefs",
      });

      if (response?.data) {
        const { values } = response.data;
        const payments = googleService.mapValuesToObject(values);
        let rows = payments.filter((payment) => {
          let filterCondition = true;

          if (userId) {
            filterCondition &&= payment["UserID"] === userId;
          }

          if (filters?.sessionId) {
            filterCondition &&= payment["SessionID"] === filters?.sessionId;
          }

          return filterCondition;
        });

        rows = await Promise.all(
          rows.map(async (payment) => {
            const userInfo = await context.fetchOneUser(payment.UserID, auth);

            if (userInfo) {
              delete userInfo?.Password;
            }

            return {
              ...payment,
              User: userInfo,
            };
          })
        );

        return { rows, count: payments.length };
      }

      return response?.data;
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
      startDate,
      endDate,
      title,
      details,
      isActive,
      deleted,
      createdAt,
      updatedAt,
    }) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "Sessions",
        values: [
          [
            sessionId,
            title,
            startDate,
            endDate,
            isActive,
            details,
            deleted,
            createdAt,
            updatedAt,
          ],
        ],
      });
      return response?.data?.updates?.updatedRows;
    },

    /**
     * Finds a session record
     * @param {string} sessionId
     * @returns
     */
    async fetchOneSession(sessionId) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "Sessions",
      });

      if (response?.data) {
        const { values } = response.data;
        const sessions = googleService.mapValuesToObject(values);
        return sessions.find((session) => {
          return [session["SessionID"]].includes(sessionId);
        });
      }

      return response?.data;
    },

    /**
     * Finds the most recent session record
     * @returns
     */
    async fetchCurrentSession() {
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "Sessions",
      });

      if (response?.data) {
        const { values } = response.data;
        const sessions = googleService.mapValuesToObject(values);
        return sessions.filter((session) => session.IsActive).pop();
      }

      return response?.data;
    },

    /**
     * Adds a new admission form record
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
    async saveAdmissionForm({
      formId,
      createdAt,
      updatedAt,
      ...restOfPayload
    }) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "AdmissionForms",
        values: [
          [
            formId,
            title,
            startDate,
            endDate,
            details,
            deleted,
            createdAt,
            updatedAt,
          ],
        ],
      });
      return response?.data?.updates?.updatedRows;
    },

    /**
     * Finds an admission record
     * @param {string} searchParam
     * @returns
     */
    async fetchOneAdmissionForm(searchParam) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "AdmissionForms",
      });

      if (response?.data) {
        const { values } = response.data;
        const forms = googleService.mapValuesToObject(values);
        return forms.find((form) => {
          return [form["SessionID"], form["FormID"]].includes(searchParam);
        });
      }

      return response?.data;
    },
  };
};

module.exports = DataRepo();
