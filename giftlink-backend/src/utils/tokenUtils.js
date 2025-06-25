import jwt from "jsonwebtoken";
import config from "../config/config.js";
import logger from "./logger.js";
import {
  InvalidTokenError,
  GenerateTokenError,
} from "../middlewares/errorHandler.js";

const { nodeEnv } = config;

export const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
    logger.info("Token generated successfully");
    return token;
  } catch (error) {
    logger.error("Error generating token", { stack: error.stack });
    throw new GenerateTokenError("Failed to generate token: " + error.message);
  }
};

// Verify the token and return the decoded payload
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    if (nodeEnv === "development") {
      logger.debug("Decoded token payload", { payload: decoded });
    } else logger.info("Token verified successfully");
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new InvalidTokenError("Token expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new InvalidTokenError("Invalid token");
    } else {
      throw new InvalidTokenError(
        "Token verification failed: " + error.message
      );
    }
  }
};
