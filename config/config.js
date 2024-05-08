/* eslint-disable quote-props */
const { config } = require("dotenv");

config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL_DEV",
    dialect: "mysql",
    // Use a different storage (sequelize, json, none). Default: none
    seederStorage: "sequelize",
    logging: false,
    dialectOptions: {
      multipleStatements: true
    },
    pool: {
      max: 350,
      min: 0,
      acquire: 220000,
      idle: 10000,
    },
  },
  test: {
    use_env_variable: "DATABASE_URL_TEST",
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      multipleStatements: true
    },
    // Use a different storage (sequelize, json, none). Default: none
    seederStorage: "sequelize",
    // Use a different table name. Default: SequelizeData
    // seederStorageTableName: "sequelize_data",
  },
  production: {
    use_env_variable: "DATABASE_URL_PROD",
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      multipleStatements: true
    },
    // Use a different storage (sequelize, json, none). Default: none
    seederStorage: "sequelize",
    // Use a different table name. Default: SequelizeData
    // seederStorageTableName: "sequelize_data",
  },
};
