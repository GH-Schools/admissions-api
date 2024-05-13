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
     * @param {string} [sessionId] 
     * @returns
     */
    async fetchOnePayment(reference, userId, sessionId) {
      return dataRepo.fetchOnePayment(reference, userId, sessionId);
    },

    /**
     * Finds all payment record
     * @param {{}} filters
     * @param {string} [userId]
     * @returns
     */
    async fetchAllPayments(filters, userId) {
      return dataRepo.fetchAllPayments(filters, userId);
    },

    /**
     * Adds a new session record
     * @param {import('../schemas/SessionSchema')} payload
     * @returns
     */
    async addNewSession(payload) {
      return dataRepo.addNewSession(payload);
    },

    /**
     * Finds a session record
     * @param {string} [sessionId]
     * @returns
     */
    async fetchOneSession(sessionId) {
      return sessionId
        ? dataRepo.fetchOneSession(sessionId)
        : dataRepo.fetchCurrentSession();
    },
  };
};

module.exports = DataSource;
