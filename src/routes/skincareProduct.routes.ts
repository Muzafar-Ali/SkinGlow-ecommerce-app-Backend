import express from "express";
import requestValidator from "../middlewares/requestValidator";
import { createSkincareProductHandler } from "../controllers/skincare.controllers";
import { SkincareSchema } from "../schema/skincareProduct.schema";

const router = express.Router();

router.post("/create", requestValidator(SkincareSchema), createSkincareProductHandler);

export default router;
