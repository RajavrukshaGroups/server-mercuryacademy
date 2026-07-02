import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      error.statusCode || 500,
      error.message || "Internal Server Error",
    );
  }

  // Log complete error on server
  logger.error(error);

  return res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
  });
};

export default errorMiddleware;
