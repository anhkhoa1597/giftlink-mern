import Gift from "../models/gift.js";
import logger from "../utils/logger.js";

export const searchGift = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filters = {};
    const { name, category, condition, age_years } = req.query;
    const ageLimit = parseInt(age_years);

    if (name?.trim()) {
      filters.name = { $regex: name.trim(), $options: "i" };
    }

    if (category?.trim()) {
      filters.category = { $regex: category.trim(), $options: "i" };
    }

    if (condition?.trim()) {
      filters.condition = { $regex: condition.trim(), $options: "i" };
    }

    if (!isNaN(ageLimit) && ageLimit > 0) {
      filters.age_years = { $lte: ageLimit };
    }

    const [gifts, total] = await Promise.all([
      Gift.find(filters).skip(skip).limit(limit),
      Gift.countDocuments(filters),
    ]);

    // Logging
    if (gifts.length === 0) {
      logger.info("Search returned no matches", { filters });
    } else {
      logger.info("Search returned results", {
        filters,
        count: gifts.length,
        total,
      });
    }

    // Trả về dù là kết quả rỗng
    res.status(200).json({
      gifts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    logger.error("Error in searchGift", {
      stack: error.stack,
      filters: req.query,
    });
    next(error);
  }
};
