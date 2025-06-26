import { NotFoundError } from "../middlewares/errorHandler.js";
import Gift from "../models/gift.js";
import logger from "../utils/logger.js";

export const searchGift = async (req, res, next) => {
  try {
    let query = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const name = req.query.name;
    if (name && name.trim() !== "")
      query.name = { $regex: name, $options: "i" };
    if (req.query.category && req.query.category !== "")
      query.category = { $regex: req.query.category, $options: "i" };
    if (req.query.condition && req.query.condition !== "")
      query.condition = { $regex: req.query.condition, $options: "i" };
    if (req.query.age_years && req.query.age_years > 0)
      query.age_years = { $lte: parseInt(req.query.age_years) };

    const [gifts, total] = await Promise.all([
      Gift.find(query).skip(skip).limit(limit),
      Gift.countDocuments(query),
    ]);

    if (gifts.length === 0) {
      throw new NotFoundError("Item not found");
    }

    logger.info(`Fetched searching gifts successfully`);
    res.json({
      gifts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error("Error", { stack: error.stack });
    next(error);
  }
};
