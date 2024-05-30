import express from "express";
import requestValidator from "../middlewares/requestValidator";
import { createSkincareProductHandler, getAllSkincareProductHandler, getSkincareProductCollectionHandler } from "../controllers/skincare.controllers";
import { SkincareSchema } from "../schema/skincareProduct.schema";

const router = express.Router();

router.post("/create", requestValidator(SkincareSchema), createSkincareProductHandler);
router.get("/all", getAllSkincareProductHandler);
router.get("/collection", getSkincareProductCollectionHandler);


export default router;
