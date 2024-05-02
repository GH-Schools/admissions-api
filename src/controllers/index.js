const userControllers = require("./users");
const generalControllers = require("./general");
const paymentControllers = require("./payment");

module.exports = {
  ...userControllers,
  ...generalControllers,
  ...paymentControllers,
};
