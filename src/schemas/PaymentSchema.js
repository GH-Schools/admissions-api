const hash = require("../utils/hash");
const { generateRandomCharacters } = require("../utils/helpers");

/**
 * @class
 *
 */
class PaymentSchema {
  /**
   * @param {string} userId
   * @param {string} reference
   */
  constructor(
    userId,
    reference,
  ) {
    this.payId = generateRandomCharacters(6, {
      lowercase: true,
      splitBy: "-",
      splitInterval: "3",
    });
    this.reference = reference;
    this.userId = userId;
    this.isActive = true;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

module.exports = PaymentSchema;
