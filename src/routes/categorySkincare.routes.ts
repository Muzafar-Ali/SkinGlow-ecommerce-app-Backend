
import express from 'express';
import { skinCareSchema, skinConditionSchema } from '../schema/category.schema';
import requestValidator from '../middlewares/requestValidator';
import { createSkinCareCategoryHandler, createSkinConditionCategoryHandler, getSkinCareCategoryHandler, getSkinConditionCategoryHandler } from '../controllers/category.controllers';

const router = express.Router();

router.post("/skincare/create", requestValidator(skinCareSchema), createSkinCareCategoryHandler);
router.post("/skincondition/create", requestValidator(skinConditionSchema), createSkinConditionCategoryHandler);

router.get("/skincare/all", getSkinCareCategoryHandler)
router.get("/skincondition/all", getSkinConditionCategoryHandler)

export default router;