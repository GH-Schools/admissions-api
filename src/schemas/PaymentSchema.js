const hash = require("../utils/hash");
const { generateRandomCharacters } = require("../utils/helpers");

/**
 * @class
 *
 */
class PaymentSchema {
  /**
   * @param {string} userId
   * @param {string} sessionId current academic session id
   * @param {string} reference
   * @param {string} amount
   */
  constructor(
    userId,
    sessionId,
    reference,
    amount
  ) {
    this.payId = generateRandomCharacters(6, {
      lowercase: true,
      splitBy: "-",
      splitInterval: "3",
    });
    this.amount = amount;
    this.reference = reference;
    this.userId = userId;
    this.sessionId = sessionId;
    this.isActive = true;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

module.exports = PaymentSchema;
