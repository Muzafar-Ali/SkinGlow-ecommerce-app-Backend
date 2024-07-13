import express from "express";
import requestValidator from "../middlewares/requestValidator";
import { CheekMakeupShcema, EyesMakeupSchema, FeaturedSchema, LipsMakeupSchema } from "../schema/category.schema";
import {
  createCheekMakeupCategoryHandler,
  createEyesMakeupCategoryHandler,
  createFeaturedMakeupCategoryHandler,
  createLipsMakeupCategoryHandler,
  getCheekMakeupCategoryHandler,
  getCheekMakeupSingleCategoryHandler,
  getEyesMakeupCategoryHandler,
  getEyesMakeupSingleCategoryHandler,
  getFeaturedMakeupCategoryHandler,
  getLipsMakeupCategoryHandler,
  getLipsMakeupSingleCategoryHandler,
  getMakeupBestSellerProducts,
  getMakeupLatestProducts,
} from "../controllers/category.controllers";

const router = express.Router();

router.post("/cheek/create", requestValidator(CheekMakeupShcema), createCheekMakeupCategoryHandler);
router.post("/eyes/create", requestValidator(EyesMakeupSchema), createEyesMakeupCategoryHandler);
router.post("/lips/create", requestValidator(LipsMakeupSchema), createLipsMakeupCategoryHandler);
router.post("/featured/create", requestValidator(FeaturedSchema), createFeaturedMakeupCategoryHandler)

router.get("/cheek/all", getCheekMakeupCategoryHandler);
router.get("/cheek/:slug", getCheekMakeupSingleCategoryHandler);
router.get("/lips/all", getLipsMakeupCategoryHandler);
router.get("/lips/:slug", getLipsMakeupSingleCategoryHandler);
router.get("/eyes/all", getEyesMakeupCategoryHandler);
router.get("/eyes/:slug", getEyesMakeupSingleCategoryHandler);

router.get("/featured/all", getFeaturedMakeupCategoryHandler)
router.get("/featured/best-seller", getMakeupBestSellerProducts)
router.get("/featured/latest", getMakeupLatestProducts)

export default router;
