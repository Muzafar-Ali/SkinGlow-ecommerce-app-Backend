import express from "express";
import { createaAgoliaSearchIndexHandler, searchHandler } from "../controllers/search.controller";

const router = express.Router();

router.post("/search", createaAgoliaSearchIndexHandler);
router.get("/search", searchHandler);

export default router;