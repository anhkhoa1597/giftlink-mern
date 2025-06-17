import { NotFoundError } from "../middlewares/errorHandler.js";
import Gift from "../models/gift.js";
import logger from "../utils/logger.js";

export const searchGift = async (req, res, next) => {
  try {
    let query = {};
    const name = req.query.name;
    if (name && name.trim() !== "")
      query.name = { $regex: name, $options: "i" };
    if (req.query.category)
      query.category = { $regex: req.query.category, $options: "i" };
    if (req.query.condition)
      query.condition = { $regex: req.query.condition, $options: "i" };
    if (req.query.age_years)
      query.age_years = { $lte: parseInt(req.query.age_years) };
    const gifts = await Gift.find(query);
    if (gifts.length === 0) {
      logger.warn("Gift not found");
      throw new NotFoundError("Gift not found");
    }
    logger.info(`Fetched gifts successfully`);
    res.json(gifts);
  } catch (error) {
    logger.error("Error", { stack: error.stack });
    next(error);
  }
};
