import express from "express";
import { getAllGifts, addManyGift, getGiftById, getPaginatedGifts } from "../controllers/giftController.js";

const router = express.Router();

// GET /gifts/all - Get all gifts
router.get("/all", getAllGifts);

// GET /gifts
router.get("/", getPaginatedGifts);

// GET /gifts/:id - Get gift by id
router.get("/:id", getGiftById);

// POST /gifts/addMany - add many gifts
router.post("/add-many", addManyGift);

export default router;
