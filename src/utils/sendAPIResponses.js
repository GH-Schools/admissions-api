module.exports = {
  sendSuccessResponse: (res, code, payload) => {
    return res.status(code).json({
      success: true,
      payload,
    });
  },
  sendErrorResponse: (res, code, message) => {
    return res.status(code).json({
      success: false,
      responseCode: code,
      message,
    });
  },
};
