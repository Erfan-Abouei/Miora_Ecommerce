export enum HttpStatus {
  // =========================Success=========================
  OK = 200, // Request succeeded
  CREATED = 201, // Resource created successfully
  NO_CONTENT = 204, // Request succeeded but no content to return

  // =========================Client Errors=========================
  BAD_REQUEST = 400, // Invalid request
  UNAUTHORIZED = 401, // Authentication required or failed
  FORBIDDEN = 403, // Access denied
  NOT_FOUND = 404, // Resource not found
  METHOD_NOT_ALLOWED = 405, // HTTP method not allowed
  CONFLICT = 409, // Conflict in resource state
  TOO_MANY_REQUESTS = 429, // Rate limit exceeded

  // =========================Server Errors=========================
  INTERNAL_SERVER_ERROR = 500, // General server error
  NOT_IMPLEMENTED = 501, // Feature not implemented
  SERVICE_UNAVAILABLE = 503, // Server temporarily unavailable
  GATEWAY_TIMEOUT = 504, // Server timed out while acting as a gateway
}
