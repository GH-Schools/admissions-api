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
     * Find all users
     * @param {{ role?: string }} filters
     * @returns
     */
    async fetchAllUsers(filters) {
      const context = this;
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "UserInfo",
      });

      if (response?.data) {
        const { values } = response.data;
        const users = googleService.mapValuesToObject(values);
        let rows = users.filter((user) => {
          let filterCondition = true;

          // if (userId) {
          //   filterCondition &&= user["UserID"] === userId;
          // }

          // if (filters?.role) {
          //   filterCondition &&= user["Role"] === filters?.sessionId;
          // }

          return filterCondition;
        });

        // Include user info
        // rows = await Promise.all(
        //   rows.map(async (user) => {
        //     const userInfo = await context.fetchOneUser(user.UserID, auth);

        //     if (userInfo) {
        //       delete userInfo?.Password;
        //     }

        //     return {
        //       ...user,
        //       User: userInfo,
        //     };
        //   })
        // );

        return { rows, count: payments.length };
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
     * Adds a new admin
     * @param {{
     * firstName: string;
     * lastName: string;
     * mobile: string;
     * email: string;
     * password: string;
     * role: 'ADMIN';
     * hasVerifiedEmail: boolean;
     * emailVerificationToken: string;
     * hasVerifiedPhone: boolean;
     * }} payload
     * @returns
     */
    async createAdmin({
      adminId,
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
        sheetName: "AdminInfo",
        values: [
          [
            adminId,
            firstName,
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
     * Finds a admin
     * @param {string} searchParam
     * @param {string} [auth]
     * @returns
     */
    async fetchOneAdmin(searchParam, auth) {
      auth = auth ?? (await googleService.getAuthToken());
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "AdminInfo",
      });

      if (response?.data) {
        const { values } = response.data;
        const admins = googleService.mapValuesToObject(values);
        return admins.find((admin) => {
          return [admin["Email"], admin["Mobile"], admin["AdminID"]].includes(
            searchParam
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
     * Update admission form
     * @param {*} formId
     * @param {*} payload
     * @returns
     */
    async updateAdmissionForm(
      formId,
      { createdAt, updatedAt, ...restOfPayload }
    ) {
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
     * @param {string} [sessionId]
     * @returns
     */
    async fetchOneAdmissionForm(searchParam, sessionId) {
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

    /**
     * Finds all admission records
     * @param {{}} filters
     * @param {string} [userId]
     * @returns
     */
    async fetchAllAdmissionForms(filters, userId) {
      const context = this;
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "AdmissionForms",
      });

      if (response?.data) {
        const { values } = response.data;
        const forms = googleService.mapValuesToObject(values);
        let rows = forms.filter((form) => {
          let filterCondition = true;

          if (userId) {
            filterCondition &&= form["UserID"] === userId;
          }

          if (filters?.sessionId) {
            filterCondition &&= form["SessionID"] === filters?.sessionId;
          }

          return filterCondition;
        });

        rows = await Promise.all(
          rows.map(async (form) => {
            const userInfo = await context.fetchOneUser(form.UserID, auth);

            if (userInfo) {
              delete userInfo?.Password;
            }

            return {
              ...form,
              User: userInfo,
            };
          })
        );

        return { rows, count: forms.length };
      }

      return response?.data;
    },

    /**
     * Adds a event/schedule record
     * @param {import('../schemas/ScheduleSchema')} payload
     * @returns
     */
    async createSchedule({
      eventId,
      title,
      startDate,
      endDate,
      details,
      deleted,
      createdAt,
      updatedAt,
    }) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "EventSchedule",
        values: [
          [
            eventId,
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
     * Finds a single event/schedule record
     * @param {string} eventId
     * @param {string} [auth]
     * @returns
     */
    async fetchOneSchedule(eventId, auth) {
      auth = auth ?? (await googleService.getAuthToken());
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "EventSchedule",
      });

      if (response?.data) {
        const { values } = response.data;
        const schedules = googleService.mapValuesToObject(values);
        return schedules.find((schedule) => {
          return [schedule["SessionID"], schedule["EventID"]].includes(eventId);
        });
      }

      return response?.data;
    },

    /**
     * Finds all event/schedule records
     * @param {{}} filters
     * @returns
     */
    async fetchAllSchedules(filters) {
      const context = this;
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "EventSchedule",
      });

      if (response?.data) {
        const { values } = response.data;
        const forms = googleService.mapValuesToObject(values);
        let rows = forms.filter((form) => {
          let filterCondition = true;

          if (filters?.sessionId) {
            filterCondition &&= form["SessionID"] === filters?.sessionId;
          }

          return filterCondition;
        });

        return { rows, count: forms.length };
      }

      return response?.data;
    },

    /**
     * Update schedule
     * @param {string} eventId
     * @param {{}} payload
     * @returns
     */
    async updateSchedule(
      eventId,
      { title, startDate, endDate, details, deleted, createdAt, updatedAt }
    ) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "EventSchedule",
        values: [
          [
            eventId,
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
  };
};

module.exports = DataRepo();
