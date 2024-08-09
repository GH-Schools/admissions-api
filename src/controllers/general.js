const fs = require("fs");
const path = require("path");
const stream = require("stream");
const { once } = require("events");
const { PROJECT_DIR: appRootPath } = require('../constants');

const {
  dataSource,
  StatusCodes,
  sendErrorResponse,
  sendSuccessResponse,
  uploader: cloudUploader,
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

    /**
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
    async getLogs(req, res, next) {
      try {
        const { download, key: passkey, logFile = "app.log" } = req.query;

        if (!passkey || passkey !== "ghschooladmin123") {
          return sendErrorResponse(
            res,
            HttpStatusCode.FORBIDDEN,
            "Access Denied"
          );
        }

        const file = `./logs/${logFile}`;
        if (!!download && download === "true") {
          return res.status(HttpStatusCode.OK).download(file);
        }

        const writeStream = fs.createReadStream(file);
        stream.pipeline(writeStream, new stream.PassThrough(), res, (err) => {
          if (err) throw err;
        });

        await once(writeStream, "open");
        return stream;
      } catch (error) {
        return next(error);
      }
    },

    /**
     * @method
     * @param {Request} req
     * @param {Response} res
     * @param {Function} next
     * @returns Response
     */
    async upload(req, res, next) {
      try {
        // here
        if (!req.file) {
          return sendErrorResponse(
            res,
            HttpStatusCode.BAD_REQUEST,
            "file parameter missing in request"
          );
        }

        const filePath = `${appRootPath}/uploads/${req.file.filename}`;
        const cloudResponse = await cloudUploader(filePath, req.file.filename);

        if (!cloudResponse?.secure_url) {
          return sendErrorResponse(
            res,
            StatusCodes.INTERNAL_SERVER,
            cloudResponse
          );
        }
        // || cloudResponse.Location
        return sendSuccessResponse(res, StatusCodes.OK, {
          message: "uploaded successfully",
          data: {
            imageUrl: cloudResponse?.secure_url,
          },
        });
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = Controllers();
