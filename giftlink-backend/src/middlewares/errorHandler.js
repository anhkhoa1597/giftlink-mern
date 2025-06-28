import logger from "../utils/logger.js";

// Base custom error class
export class CustomError extends Error {
  constructor(message, name = "CustomError", statusCode = 500, details = "") {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.details = details || message;
  }
}

// Factory to simplify error subclasses
const createErrorSubclass = (
  name,
  statusCode,
  defaultMessage,
  defaultDetails
) => {
  return class extends CustomError {
    constructor(message = defaultMessage) {
      super(message, name, statusCode, defaultDetails);
    }
  };
};

// Common error subclasses
export const GenerateTokenError = createErrorSubclass(
  "GenerateTokenError",
  500,
  "Failed to generate token",
  "An error occurred while generating the authentication token."
);

export const UnauthorizedError = createErrorSubclass(
  "UnauthorizedError",
  401,
  "Unauthorized access",
  "You do not have permission to access this resource."
);

export const AuthenticationError = createErrorSubclass(
  "AuthenticationError",
  403,
  "Authentication failed",
  "You must be authenticated to access this resource."
);

export const InvalidTokenError = createErrorSubclass(
  "InvalidTokenError",
  403,
  "Invalid or expired token",
  "The provided token is invalid or has expired."
);

export const PasswordMismatchError = createErrorSubclass(
  "PasswordMismatchError",
  403,
  "Password mismatch",
  "The provided password does not match."
);

export const ValidationError = createErrorSubclass(
  "ValidationError",
  400,
  "Validation failed",
  "Request data did not pass validation."
);

export const NotFoundError = createErrorSubclass(
  "NotFoundError",
  404,
  "Resource not found",
  "The requested resource could not be found."
);

export const BadRequestError = createErrorSubclass(
  "BadRequestError",
  400,
  "Bad request",
  "The request could not be understood or was missing required parameters."
);

export const InternalServerError = createErrorSubclass(
  "InternalServerError",
  500,
  "Internal server error",
  "An unexpected error occurred on the server."
);

// Centralized error handler middleware
export const errorHandler = (err, req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (!(err instanceof Error)) {
    err = new InternalServerError();
  }

  logger.error(`${err.name || "UnknownError"}: ${err.message}`, {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    stack: err.stack,
  });

  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const errorResponse = {
    status: err.name || "InternalServerError",
    statusCode,
    message: err.message || "Something went wrong",
    ...(isProduction ? {} : { details: err.details || err.message }),
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(errorResponse);
};
