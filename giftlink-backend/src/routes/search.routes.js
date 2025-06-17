import express from "express";
import { searchGift } from "../controllers/searchController.js";
const router = express.Router();

router.get("/", searchGift);

export default router;
