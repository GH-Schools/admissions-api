/**
 *
 * @param {import('./GFormDataRepo')} dataRepo
 * @returns
 */
const DataSource = function (dataRepo) {
  return {
    async test() {
      return dataRepo.test();
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
    async createUser(payload) {
      return dataRepo.createUser(payload);
    },

    /**
     * Finds a user
     * @param {string} searchParam
     * @returns
     */
    async fetchOneUser(searchParam) {
      return dataRepo.fetchOneUser(searchParam);
    },

    /**
     * Adds a new payment record
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
   async createPaymentRecord(payload) {
     return dataRepo.createPaymentRecord(payload);
   },
  };
};

module.exports = DataSource;
