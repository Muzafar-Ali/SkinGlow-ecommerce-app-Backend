import express from 'express';
import requestValidator from '../middlewares/requestValidator';
import { FeaturedSchema } from '../schema/category.schema';
import { createFeaturedCategoryHandler, getFeaturedCategoryHandler } from '../controllers/category.controllers';

const router = express.Router();

router.post("/featured/create", requestValidator(FeaturedSchema), createFeaturedCategoryHandler)
router.get("/featured/all", getFeaturedCategoryHandler)

export default router;