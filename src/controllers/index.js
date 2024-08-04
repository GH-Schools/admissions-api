const userControllers = require("./users");
const generalControllers = require("./general");
const paymentControllers = require("./payment");
const sessionControllers = require('./sessions');
const admissionControllers = require('./admissions');
const scheduleControllers = require('./eventSchedules');

module.exports = {
  ...userControllers,
  ...generalControllers,
  ...paymentControllers,
  ...sessionControllers,
  ...admissionControllers,
  ...scheduleControllers
};
