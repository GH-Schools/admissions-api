const {
  sendSuccessResponse,
  StatusCodes,
  dataSource,
  sendErrorResponse,
} = require("./imports");

const Controllers = function () {
  return {
    async healthCheck(req, res, next) {
      try {
        const response = await dataSource.test();
        const res2 = await dataSource.fetchOneUser("2222");

        console.log("output for fetchOneUser", JSON.stringify(res2, null, 2));
        if (!response?.sheets) {
          return sendErrorResponse(
            res,
            StatusCodes.NOT_FOUND,
            "DB could not be found"
          );
        }

        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "Working Fine",
          payload: res2,
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
