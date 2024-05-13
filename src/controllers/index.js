const userControllers = require("./users");
const generalControllers = require("./general");
const paymentControllers = require("./payment");
const sessionControllers = require('./sessions');

module.exports = {
  ...userControllers,
  ...generalControllers,
  ...paymentControllers,
  ...sessionControllers
};
