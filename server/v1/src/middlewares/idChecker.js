const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");

const idChecker = (field) => (req, res, next) => {
  if (!req?.params[field || "id"]?.match(/^[0-9a-fA-F]{24}$/)) {
    next(new ApiError("Lütfen geçerli bir ID bilgisi giriniz", httpStatus.BAD_REQUEST));
    return;
  }
  next();
};

module.exports = idChecker;
