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
     * @param {import('../schemas/User')} payload
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
     * @param {import('../schemas/PaymentSchema')} payload
     * @returns
     */
    async createPaymentRecord(payload) {
      return dataRepo.createPaymentRecord(payload);
    },

    /**
     * Finds a payment record
     * @param {string} reference
     * @param {string} [userId] 
     * @returns
     */
    async fetchOnePayment(reference, userId) {
      return dataRepo.fetchOnePayment(reference, userId);
    },
  };
};

module.exports = DataSource;
