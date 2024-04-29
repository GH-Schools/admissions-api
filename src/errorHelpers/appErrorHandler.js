module.exports = (err, req, res, next) => {
  try {
    console.log(err);
  } catch (error) {
    next(error);
  }
}