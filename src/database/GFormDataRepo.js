const googleService = require("../utils/googleServices");
const hash = require("../utils/hash");
const { generateRandomCharacters } = require("../utils/helpers");

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
      firstName,
      lastName,
      mobile,
      email,
      password,
      hasVerifiedEmail = false,
      hasVerifiedPhone = false,
      isActive = true,
    }) {
      const userId = generateRandomCharacters(6, {
        lowercase: true,
        splitBy: "-",
        splitInterval: "3",
      });
      const createdAt = new Date();
      const updatedAt = createdAt;

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
            hash.encryptV2(password),
            hasVerifiedEmail,
            hasVerifiedPhone,
            isActive,
            createdAt,
            updatedAt,
          ],
        ],
      });
      return response?.data;
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
          return [user["Email"], user["Phone"], user["UserID"]].includes(
            searchParam
          );
        });
      }

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
    async createPaymentRecord({
      userId,
      firstName,
      lastName,
      mobile,
      email,
      password,
      hasVerifiedEmail = false,
      hasVerifiedPhone = false,
      isActive = true,
    }) {
      const auth = await googleService.getAuthToken();
      const response = await googleService.appendToSpreadSheetValues({
        auth,
        sheetName: "PaymentRefs",
        values: [
          [
            userId,
            firstName,
            lastName,
            email,
            mobile,
            password,
            hasVerifiedEmail,
            hasVerifiedPhone,
            isActive,
            createdAt,
            updatedAt,
          ],
        ],
      });
      return response?.data;
    },
  };
};

module.exports = DataRepo();
