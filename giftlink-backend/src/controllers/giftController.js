import {
  NotFoundError,
} from "../middlewares/errorHandler.js";
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

export const getPaginatedGifts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // trang hiện tại (mặc định 1)
    const limit = parseInt(req.query.limit) || 12; // số phần tử mỗi trang

    const skip = (page - 1) * limit;

    const [gifts, total] = await Promise.all([
      Gift.find().skip(skip).limit(limit),
      Gift.countDocuments(),
    ]);

    logger.info("Fetch Gifts successfully");
    res.json({
      gifts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    logger.error("Error", { stack: err.stack });
    next(err);
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

export const addManyGift = async (req, res, next) => {
  try {
    const { docs } = req.body;

    const count = await Gift.countDocuments();
    if (count === 0) {
      const result = await Gift.insertMany(docs);
      logger.info(`Insert documents: ${result.length}`);
      res.json({ message: "successfully add data" });
    } else {
      logger.error("Gifts already exist in DB");
    }
  } catch (error) {
    logger.error("Error", { stack: error.stack });
    next(error);
  }
};
