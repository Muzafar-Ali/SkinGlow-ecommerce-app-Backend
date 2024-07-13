
import express from 'express';
import { FeaturedSchema, skinCareSchema, skinConditionSchema } from '../schema/category.schema';
import requestValidator from '../middlewares/requestValidator';
import { 
    createFeaturedSkincareCategoryHandler, 
    createSkinCareCategoryHandler, 
    createSkinConditionCategoryHandler, 
    getFeaturedSkincareCategoryHandler, 
    getSkinCareCategoryHandler, 
    getSkinCareSingleCategoryHandler, 
    getSkinConditionCategoryHandler, 
    getSkinConditionSingleCategoryHandler, 
    getSkincareBestSellerProducts, 
    getSkincareLatestProducts
} from '../controllers/category.controllers';

const router = express.Router();

router.post("/skincare/create", requestValidator(skinCareSchema), createSkinCareCategoryHandler);
router.post("/skincondition/create", requestValidator(skinConditionSchema), createSkinConditionCategoryHandler);
router.post("/featured/create", requestValidator(FeaturedSchema), createFeaturedSkincareCategoryHandler)

router.get("/skincare/all", getSkinCareCategoryHandler)
router.get("/skincare/:slug", getSkinCareSingleCategoryHandler)
router.get("/skincondition/all", getSkinConditionCategoryHandler)
router.get("/skincondition/:slug", getSkinConditionSingleCategoryHandler)

router.get("/featured/all", getFeaturedSkincareCategoryHandler)
router.get("/featured/best-seller", getSkincareBestSellerProducts)
router.get("/featured/latest", getSkincareLatestProducts)

export default router;
