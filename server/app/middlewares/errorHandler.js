import StatusService from "../services/status.js";
import logger from "../services/logger.service.js";
import { errorResponse } from "../utils/response.js";

function errorHandler(error, req, res, _next) {
  const isStatusService = error instanceof StatusService;

  if (!isStatusService) {
    logger.error(`Server error: ${req.method} ${req.url}`, {
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
    error = StatusService.INTERNAL_SERVER_ERROR();
  }

  errorResponse(res, error);
}

export default errorHandler;
