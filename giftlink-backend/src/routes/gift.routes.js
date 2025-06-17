import express from "express";
import { getAllGifts, addManyGift, getGiftById } from "../controllers/giftController.js";

const router = express.Router();

// GET /gifts - Get all gifts
router.get("/", getAllGifts);

// GET /gifts/:id - Get gift by id
router.get("/:id", getGiftById);

// POST /gifts/addMany - add many gifts
router.post("/add-many", addManyGift);

export default router;
