module.exports = (req, res, next) => {
  try {
    next()
  } catch (error) {
    next(error);
  }
}