const logger= require("pino")()
function errorHandler(error, request, response, next) {
  logger.warn(error)
    return response.status(error.status || 500).json({
      error: {
        message: error.message || "Sorry! Something went wrong,Try again later"
      }
    });
  }
  
  module.exports = errorHandler;