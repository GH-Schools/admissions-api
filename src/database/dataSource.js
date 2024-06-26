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
     * Updates a user
     * @param {string} userId
     * @param {{}} payload
     * @returns
     */
     async updateUser(userId, payload) {
      return dataRepo.updateUser(userId, payload);
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

    /**
     * Adds a new admission form record
     * @param {import('../schemas/AdmissionFormsSchema')} payload
     * @returns
     */
    async saveAdmissionForm(payload) {
      return dataRepo.saveAdmissionForm(payload);
    },

    /**
     * Finds an admission record
     * @param {string} searchParam
     * @returns
     */
    async fetchOneAdmissionForm(searchParam) {
      return dataRepo.fetchOneAdmissionForm(searchParam)
    },
  };
};

module.exports = DataSource;
