export class HttpError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const createHttpError = (statusCode: number, message: string) => {
  const errorResponse = new HttpError(statusCode, message);
  console.error("error response from server ", errorResponse);
  return errorResponse;
};

