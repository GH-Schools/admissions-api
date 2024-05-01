const dataRepo = require("../database/dataRepo");
const DataSource = require("../database/dataSource");
const StatusCodes = require("../constants/StatusCodes");

const { sendSuccessResponse, sendErrorResponse } = require("../utils/sendAPIResponses");

const dataSource = DataSource(dataRepo);

module.exports = {
  dataSource,
  StatusCodes,
  sendErrorResponse,
  sendSuccessResponse,
}