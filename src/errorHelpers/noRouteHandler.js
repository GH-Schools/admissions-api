/**
 *
 * @param {Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
module.exports = (req, res, next) => {
  try {
    return res
      .status(404)
      .send(
        "<h1>This resource is not found. Please check the endpoint you are trying to access.</h1>"
      );
  } catch (error) {
    return next(error);
  }
};
