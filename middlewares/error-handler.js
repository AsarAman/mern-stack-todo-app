const httpStatusCodes = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  const errorMessage = {
    message: err.message || "Something went wrong!!!",
    status: err.statusCode || httpStatusCodes.INTERNAL_SERVER_ERROR,
  };
  if (err.name === "ValidationError") {
    errorMessage.status = httpStatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message
    errorMessage.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }

  if (err.code && err.code === 11000) {
    errorMessage.status = httpStatusCodes.BAD_REQUEST;
    errorMessage.message = `${Object.keys(
      err.keyValue
    )} field has to be unique`;
  }

  res.status(errorMessage.status).json({ msg: errorMessage.message });
};

module.exports = errorHandler;
