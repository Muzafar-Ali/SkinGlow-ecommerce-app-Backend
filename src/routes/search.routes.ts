import express from "express";
import { createSearchIndexHandler, srachHandler } from "../controllers/search.controller";

const router = express.Router();

router.post("/search", createSearchIndexHandler);
router.get("/search", srachHandler);

export default router;