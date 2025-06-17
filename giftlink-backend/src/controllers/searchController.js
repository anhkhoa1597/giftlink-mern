import { NotFoundError } from "../middlewares/errorHandler.js";
import Gift from "../models/gift.js";
import logger from "../utils/logger.js";

export const getAllGifts = async (req, res, next) => {
  try {
    const gifts = await Gift.find({});
    logger.info("Fetch all Gift");
    res.json(gifts);
  } catch (error) {
    logger.error("Error fetching gifts", { stack: error.stack });
    next(error);
  }
};

export const getGiftById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const gift = await Gift.findOne({ id });
    if (!gift) {
      logger.warn("Gift not found");
      throw new NotFoundError("Gift not found");
    }
    logger.info(`Fetched gift with id ${id}`);
    res.json(gift);
  } catch (error) {
    logger.error("Error", { stack: error.stack });
    next(error);
  }
};
