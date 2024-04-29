const StatusCodes = require("../constants/StatusCodes");
const dataRepo = require("../database/dataRepo");
const DataSource = require("../database/dataSource");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/sendAPIResponses");

const dataSource = DataSource(dataRepo);

module.exports = {
  StatusCodes,
  dataSource,
  sendSuccessResponse,
  sendErrorResponse
}