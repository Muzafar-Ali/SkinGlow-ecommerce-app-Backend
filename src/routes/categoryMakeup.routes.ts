import express from "express";
import requestValidator from "../middlewares/requestValidator";
import { CheekMakeupShcema, EyesMakeupSchema, FeaturedSchema, LipsMakeupSchema } from "../schema/category.schema";
import {
  createCheekMakeupCategoryHandler,
  createEyesMakeupCategoryHandler,
  createFeaturedMakeupCategoryHandler,
  createLipsMakeupCategoryHandler,
  getCheekMakeupCategoryHandler,
  getEyesMakeupCategoryHandler,
  getFeaturedMakeupCategoryHandler,
  getLipsMakeupCategoryHandler,
  getMakeupBestSellerProducts,
} from "../controllers/category.controllers";

const router = express.Router();

router.post("/cheek/create", requestValidator(CheekMakeupShcema), createCheekMakeupCategoryHandler);
router.post("/eyes/create", requestValidator(EyesMakeupSchema), createEyesMakeupCategoryHandler);
router.post("/lips/create", requestValidator(LipsMakeupSchema), createLipsMakeupCategoryHandler);
router.post("/featured/create", requestValidator(FeaturedSchema), createFeaturedMakeupCategoryHandler)

router.get("/cheek/all", getCheekMakeupCategoryHandler);
router.get("/lips/all", getLipsMakeupCategoryHandler);
router.get("/eyes/all", getEyesMakeupCategoryHandler);
router.get("/featured/all", getFeaturedMakeupCategoryHandler)
router.get("/featured/best-seller", getMakeupBestSellerProducts)

export default router;
