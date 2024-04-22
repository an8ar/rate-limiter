export default class ApiError extends Error {
  status: number;
  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static UnauthorizedError() {
    return new ApiError(401, "Not authorized");
  }

  static PermissionError() {
    return new ApiError(403, "No permission");
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}
