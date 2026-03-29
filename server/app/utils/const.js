export const httpStatus = Object.freeze({
  OK: {
    key: "OK",
    code: 200,
    data: "Success",
  },
  CREATED: {
    key: "CREATED",
    code: 201,
    data: "Created",
  },
  ACCEPTED: {
    key: "ACCEPTED",
    code: 202,
    data: "Accepted",
  },
  NO_CONTENT: {
    key: "NO_CONTENT",
    code: 204,
    data: "No Content",
  },
  BAD_REQUEST: {
    key: "BAD_REQUEST",
    code: 400,
    data: "Bad Request",
  },
  UNAUTHORIZED: {
    key: "UNAUTHORIZED",
    code: 401,
    data: "Unauthorized",
  },
  FORBIDDEN: {
    key: "FORBIDDEN",
    code: 403,
    data: "Forbidden",
  },
  NOT_FOUND: {
    key: "NOT_FOUND",
    code: 404,
    data: "Not Found",
  },
  METHOD_NOT_ALLOWED: {
    key: "METHOD_NOT_ALLOWED",
    code: 405,
    data: "Method Not Allowed",
  },
  REQUEST_TIMEOUT: {
    key: "REQUEST_TIMEOUT",
    code: 408,
    data: "Request Timeout",
  },
  CONFLICT: {
    key: "CONFLICT",
    code: 409,
    data: "Conflict",
  },
  UNPROCESSABLE_ENTITY: {
    key: "UNPROCESSABLE_ENTITY",
    code: 422,
    data: "Unprocessable Entity",
  },
  TOO_MANY_REQUESTS: {
    key: "TOO_MANY_REQUESTS",
    code: 429,
    data: "Too Many Requests",
  },
  INTERNAL_SERVER_ERROR: {
    key: "INTERNAL_SERVER_ERROR",
    code: 500,
    data: "Internal Server Error",
  },
  NOT_IMPLEMENTED: {
    key: "NOT_IMPLEMENTED",
    code: 501,
    data: "Not Implemented",
  },
  BAD_GATEWAY: {
    key: "BAD_GATEWAY",
    code: 502,
    data: "Bad Gateway",
  },
  SERVICE_UNAVAILABLE: {
    key: "SERVICE_UNAVAILABLE",
    code: 503,
    data: "Service Unavailable",
  },
  GATEWAY_TIMEOUT: {
    key: "GATEWAY_TIMEOUT",
    code: 504,
    data: "Gateway Timeout",
  },
});
