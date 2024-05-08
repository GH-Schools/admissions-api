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
     * hasVerifiedPhone: boolean;
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
            lastName,
            email,
            mobile,
            password,
            hasVerifiedEmail,
            emailVerificationToken,
            hasVerifiedPhone,
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
     * Finds a user
     * @param {string} searchParam
     * @returns
     */
    async fetchOneUser(searchParam) {
      const auth = await googleService.getAuthToken();
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
     * Adds a new user
     * @param {{
     * payId: string;
     * userId: string;
     * reference: string;
     * isActive: boolean;
     * deleted: boolean;
     * }} payload
     * @returns
     */
    async createPaymentRecord({
      payId,
      userId,
      reference,
      isActive,
      deleted,
    }) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "PaymentRefs",
        values: [[payId, userId, reference, isActive, deleted]],
      });
      return response?.data?.updates?.updatedRows;
    },

    /**
     * Finds a payment record
     * @param {string} reference
     * @returns
     */
    async fetchOnePayment(reference) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.getSpreadSheetValues({
        auth,
        sheetName: "PaymentRefs",
      });

      if (response?.data) {
        const { values } = response.data;
        const payments = googleService.mapValuesToObject(values);
        return payments.find((payment) => {
          return [payment["PayId"], payment["Reference"], payment["UserID"]].includes(
            reference
          );
        });
      }

      return response?.data;
    },
  };
};

module.exports = DataRepo();
