import express from "express";
import requestValidator from "../middlewares/requestValidator";
import { CheekMakeupShcema, EyesMakeupSchema, LipsMakeupSchema } from "../schema/category.schema";
import {
  createCheekMakeupCategoryHandler,
  createEyesMakeupCategoryHandler,
  createLipsMakeupCategoryHandler,
  getCheekMakeupCategoryHandler,
  getEyesMakeupCategoryHandler,
  getLipsMakeupCategoryHandler,
} from "../controllers/category.controllers";

const router = express.Router();

router.post("/cheek/create", requestValidator(CheekMakeupShcema), createCheekMakeupCategoryHandler);
router.post("/eyes/create", requestValidator(EyesMakeupSchema), createEyesMakeupCategoryHandler);
router.post("/lips/create", requestValidator(LipsMakeupSchema), createLipsMakeupCategoryHandler);

router.get("/cheek/all", getCheekMakeupCategoryHandler);
router.get("/lip/all", getLipsMakeupCategoryHandler);
router.get("/eyes/all", getEyesMakeupCategoryHandler);

export default router;
