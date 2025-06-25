import logger from "../utils/logger.js";
import { UnauthorizedError } from "./errorHandler.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(new UnauthorizedError("Token required"));
  }

  try {
    const decodedUser = verifyToken(token);
    req.user = decodedUser;
    logger.info("Token verified successfully", { user: decodedUser });
    next();
  } catch (error) {
    next(error);
  }
};
