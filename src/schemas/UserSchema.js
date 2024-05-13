const hash = require("../utils/hash");
const { generateRandomCharacters, formatPhone } = require("../utils/helpers");

/**
 * @class
 *
 */
class UserSchema {
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
    this.mobile = formatPhone(mobile);
    this.password = hash.encryptV2(password);
    this.hasVerifiedEmail = false;
    this.emailVerificationToken = generateRandomCharacters(12);
    this.hasVerifiedPhone = false;
    this.role = role;
    this.isActive = true;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

module.exports = UserSchema;
