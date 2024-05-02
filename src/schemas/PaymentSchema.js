const hash = require("../utils/hash");
const { generateRandomCharacters } = require("../utils/helpers");

/**
 * @class
 *
 */
class PaymentSchema {
  /**
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} email
   * @param {string} mobile
   * @param {string} password
   * @param {string} role
   */
  constructor(
    firstName,
    lastName,
    email,
    mobile,
    password,
    role = 'STUDENT',
  ) {
    this.userId = generateRandomCharacters(6, {
      lowercase: true,
      splitBy: "-",
      splitInterval: "3",
    });
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobile = mobile;
    this.password = hash.encryptV2(password);
    this.hasVerifiedEmail = false;
    this.hasVerifiedPhone = false;
    this.role = role;
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

module.exports = PaymentSchema;
