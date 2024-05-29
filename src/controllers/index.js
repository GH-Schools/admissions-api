const userControllers = require("./users");
const generalControllers = require("./general");
const paymentControllers = require("./payment");
const sessionControllers = require('./sessions');
const admissionControllers = require('./admissions');

module.exports = {
  ...userControllers,
  ...generalControllers,
  ...paymentControllers,
  ...sessionControllers,
  ...admissionControllers
};
