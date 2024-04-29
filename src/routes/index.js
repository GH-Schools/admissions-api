const router = require("express").Router();
const apikeyMid = require("../middlewares/apikeyMid");
const controllers = require('../controllers');

router.get("/health-check", apikeyMid, controllers.healthCheck);

module.exports = router;
