export class CustomError extends Error {
  statusCode: string;
  constructor(message: string, statusCode: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class AuthorizationError extends Error {
  statusCode: string;
  constructor(message: string) {
    super(message);
    this.statusCode = "401";
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
