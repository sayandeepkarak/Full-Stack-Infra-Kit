import { httpStatus } from "../utils/const.js";

class StatusService {
  constructor(data) {
    this.key = data.key;
    this.code = data.code;
    this.data = data.data;
  }

  static OK(data) {
    return getStatus(httpStatus.OK.key, data);
  }

  static CREATED(data) {
    return getStatus(httpStatus.CREATED.key, data);
  }

  static ACCEPTED(data) {
    return getStatus(httpStatus.ACCEPTED.key, data);
  }

  static NO_CONTENT(data) {
    return getStatus(httpStatus.NO_CONTENT.key, data);
  }

  static BAD_REQUEST(data) {
    return getStatus(httpStatus.BAD_REQUEST.key, data);
  }

  static UNAUTHORIZED(data) {
    return getStatus(httpStatus.UNAUTHORIZED.key, data);
  }

  static FORBIDDEN(data) {
    return getStatus(httpStatus.FORBIDDEN.key, data);
  }

  static NOT_FOUND(data) {
    return getStatus(httpStatus.NOT_FOUND.key, data);
  }

  static METHOD_NOT_ALLOWED(data) {
    return getStatus(httpStatus.METHOD_NOT_ALLOWED.key, data);
  }

  static REQUEST_TIMEOUT(data) {
    return getStatus(httpStatus.REQUEST_TIMEOUT.key, data);
  }

  static CONFLICT(data) {
    return getStatus(httpStatus.CONFLICT.key, data);
  }

  static UNPROCESSABLE_ENTITY(data) {
    return getStatus(httpStatus.UNPROCESSABLE_ENTITY.key, data);
  }

  static TOO_MANY_REQUESTS(data) {
    return getStatus(httpStatus.TOO_MANY_REQUESTS.key, data);
  }

  static INTERNAL_SERVER_ERROR(data) {
    return getStatus(httpStatus.INTERNAL_SERVER_ERROR.key, data);
  }

  static NOT_IMPLEMENTED(data) {
    return getStatus(httpStatus.NOT_IMPLEMENTED.key, data);
  }

  static GATEWAY_TIMEOUT(data) {
    return getStatus(httpStatus.GATEWAY_TIMEOUT.key, data);
  }
}

function getStatus(key, data = null) {
  const status = httpStatus[key];
  const service = new StatusService(status);

  if (data) {
    service.data = data;
  }

  return service;
}

export default StatusService;
