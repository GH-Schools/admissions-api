const { generateRandomCharacters } = require("../utils/helpers");

/**
 * @class
 *
 */
class SessionSchema {
  /**
   * @param {string} title
   * @param {string | null} [startDate=null]
   * @param {string | null} [endDate=null]
   * @param {string} details
   */
  constructor(title, startDate = null, endDate = null, details = "[]") {
    this.sessionId = generateRandomCharacters(6, {
      lowercase: true,
      splitBy: "-",
      splitInterval: "3",
    });
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.details = "[]";
    this.isActive = true;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

module.exports = SessionSchema;
