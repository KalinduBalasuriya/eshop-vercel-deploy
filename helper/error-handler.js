function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(500).json({ message: "The user is not authorized" });
  }

  if (err.name === "ValidationError") {
    res.status(500).json({ message: err });
  }
  res.status(500).json(err);
}
module.exports = errorHandler;
