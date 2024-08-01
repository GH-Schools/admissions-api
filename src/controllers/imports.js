const dataRepo = require("../database/SQLDataRepo");
const DataSource = require("../database/dataSource");
const StatusCodes = require("../constants/statusCodes");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/sendAPIResponses");
const hash = require("../utils/hash");
const {
  createHashedToken,
  verifyHashedToken,
} = require("../utils/tokenProcessor");
const { sendEmail } = require("../utils/sendNotifications");
const { cloudinaryUpload } = require("../utils/upload");
const {
  formatPhone,
  mapAsFilters,
  generateRandomCharacters,
} = require("../utils/helpers");

const dataSource = DataSource(dataRepo);

module.exports = {
  hash,
  dataSource,
  StatusCodes,
  sendEmail,
  formatPhone,
  mapAsFilters,
  createHashedToken,
  verifyHashedToken,
  sendErrorResponse,
  sendSuccessResponse,
  generateRandomCharacters,
  uploader: cloudinaryUpload,
};
