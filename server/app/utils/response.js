export function successResponse(handler, statusServiceData) {
  statusServiceData.status = true;
  handler.status(statusServiceData.code).json(statusServiceData);
}

export function errorResponse(handler, statusServiceData) {
  statusServiceData.status = false;
  handler.status(statusServiceData.code).json(statusServiceData);
}
