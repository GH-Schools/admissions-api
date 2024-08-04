const { generateRandomCharacters } = require("../utils/helpers");

/**
 * @class
 *
 */
class ScheduleSchema {
  /**
   * @param {string} title
   * @param {string} dueDate
   * @param {string} eventType
   */
  constructor(title, dueDate, eventType) {
    this.eventId = generateRandomCharacters(6, {
      lowercase: true,
      splitBy: "-",
      splitInterval: "3",
    });
    this.title = title;
    this.dueDate = dueDate;
    this.eventType = eventType;
    this.isActive = true;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }
}

module.exports = ScheduleSchema;
