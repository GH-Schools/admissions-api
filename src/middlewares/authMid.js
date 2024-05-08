module.exports = (req, res, next) => {
  try {
    req.user = {};
    next()
  } catch (error) {
    next(error);
  }
}