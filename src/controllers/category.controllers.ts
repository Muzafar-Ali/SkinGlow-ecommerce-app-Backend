import { NextFunction, Request, Response } from "express";
import { createCategory, getCategory } from "../services/category.services";
import { CheekMakeupCategory } from "../models/categories/cheekMakeup.model";
import { EyesMakeupCategory } from "../models/categories/eyesMakeup.model";
import { LipsMakeupCategory } from "../models/categories/lipsMakeup.model";
import { 
  CheekMakeupSchemaType, 
  EyesMakeupSchemaType, 
  FeaturedSchemaType, 
  LipsMakeupSchemaType 
} from "../schema/category.schema";
import { SkinConditionCategory } from "../models/categories/skinCondition.model";
import { FeaturedCategoryMakeup } from "../models/categories/featuredMakeup.model";
import { FeaturedCategorySkincare } from "../models/categories/featuredSkincare.model";
import { SkincareCategory } from "../models/categories/skinCare.model";


// CREATE CHEEK MAKEUP CATEGORY
export const createCheekMakeupCategoryHandler = async (
  req: Request<{}, {}, CheekMakeupSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, CheekMakeupCategory);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("createCheekMakeupCategoryHandler", error);
    next(error);
  }
};

// CREATE EYES MAKEUP CATEGORY
export const createEyesMakeupCategoryHandler = async (
  req: Request<{}, {}, EyesMakeupSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, EyesMakeupCategory);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("createEyesMakeupCategoryHandler", error);
    next(error);
  }
};

// CREATE LIPS MAKEUP CATEGORY
export const createLipsMakeupCategoryHandler = async (
  req: Request<{}, {}, LipsMakeupSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, LipsMakeupCategory);

    res.status(201).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("createLipsMakeupCategoryHandler", error);
    next(error);
  }
};

// CREATE FEATURED MAKEUP CATEGORY
export const createFeaturedMakeupCategoryHandler = async (
  req: Request<{}, {}, FeaturedSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, FeaturedCategoryMakeup);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("createFeaturedMakeupCategoryHandler error:", error);
    next(error);
  }
};

// CREATE SKINCARE CATEGORY
export const createSkinCareCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, SkincareCategory);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("createSkinCareCategoryHandler", error);
    next(error);
  }
};

// CREATE SKIN CONDITION CATEGORY
export const createSkinConditionCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, SkinConditionCategory);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("createSkinConditionCategoryHandler", error);
    next(error);
  }
};

// CREATE FEATURED SKINCARE CATEGORY
export const createFeaturedSkincareCategoryHandler = async (
  req: Request<{}, {}, FeaturedSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, FeaturedCategorySkincare);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("createFeaturedSkincareCategoryHandler error:", error);
    next(error);
  }
};

// GET CHEEK MAKEUP ALL CATEGORY
export const getCheekMakeupCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(CheekMakeupCategory);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getCheekMakeupCategoryHandler", error);
    next(error);
  }
};

// GET CHEEK MAKEUP SINGLE CATEGORY
export const getCheekMakeupSingleCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    
    const category = await getCategory(CheekMakeupCategory, slug);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getCheekMakeupSingleCategoryHandler", error);
    next(error);
  }
};

// GET LIPS MAKEUP ALL CATEGORIES
export const getLipsMakeupCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(LipsMakeupCategory);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getLipsMakeupCategoryHandler", error);
    next(error);
  }
};

// GET LIPS MAKEUP SINGLE CATEGORY
export const getLipsMakeupSingleCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await getCategory(LipsMakeupCategory, slug);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getLipsMakeupSingleCategoryHandler", error);
    next(error);
  }
};

// GET EYES MAKEUP ALL CATEGORIES
export const getEyesMakeupCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(EyesMakeupCategory);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getEyesMakeupCategoryHandler", error);
    next(error);
  }
};

// GET EYES MAKEUP SINGLE CATEGORY
export const getEyesMakeupSingleCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await getCategory(EyesMakeupCategory, slug);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getEyesMakeupSingleCategoryHandler", error);
    next(error);
  }
};

// GET FEATURED MAKEUP CATEGORY
export const getFeaturedMakeupCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(FeaturedCategoryMakeup);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getFeaturedMakeupCategoryHandler", error);
    next(error);
  }
};

// GET SKINCARE ALL CATEGORIES
export const getSkinCareCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(SkincareCategory);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getSkinCareCategoryHandler", error);
    next(error);
  }
};

// GET SKINCARE SINGLE CATEGORY
export const getSkinCareSingleCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    console.log('slug', slug);
    
    const category = await getCategory(SkincareCategory, slug);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getSkinCareSingleCategoryHandler", error);
    next(error);
  }
};

// GET SKIN CONDITION ALL CATEGORIES
export const getSkinConditionCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(SkinConditionCategory);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getSkinConditionCategoryHandler", error);
    next(error);
  }
};

// GET SKIN CONDITION SINGLE CATEGORy
export const getSkinConditionSingleCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await getCategory(SkinConditionCategory, slug);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getSkinCareSingleCategoryHandler", error);
    next(error);
  }
};

// GET FEATURED SKINCARE CATEGORY
export const getFeaturedSkincareCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(FeaturedCategorySkincare);

    res.status(200).json({
      success: true,
      total: category.length,
      category,
    });
  } catch (error) {
    console.log("getFeaturedSkincareCategoryHandler", error);
    next(error);
  }
};

// GET BEST SELLER MAKEUP
export const getMakeupBestSellerProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bestSellerProducts = await FeaturedCategoryMakeup.findOne({ name: "Best Seller" })
    .populate({
      path: "products",
      // select: "-_id title price rating thumbnail", // Optional: Select specific fields
    });
    
    res.status(200).json({
      success: true,
      total: bestSellerProducts?.products.length,
      bestSellerProducts,
    });

  } catch (error) {
    console.error("Error fetching best sellers makeup: ", error);
    next(error);
  }
};

// GET LATEST MAKEUP
export const getMakeupLatestProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const latestProducts = await FeaturedCategoryMakeup.findOne({ name: "Latest" })
    .populate({
      path: "products",
      // select: "-_id title price rating thumbnail", // Optional: Select specific fields
    });

    res.status(200).json({
      success: true,
      total: latestProducts?.products.length,
      latestProducts,
    });

  } catch (error) {
    console.error("Error fetching latest makeup: ", error);
    next(error);
  }
};

// GET BEST SELLER SKINCARE
export const getSkincareBestSellerProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bestSellerProducts = await FeaturedCategorySkincare.findOne({ name: "Best Seller" })
    .populate({
      path: "products", 
      // select: "-_id title price rating thumbnail", // Optional: Select specific fields
    });
    
    res.status(200).json({
      success: true,
      total: bestSellerProducts?.products.length,
      bestSellerProducts,
    });

  } catch (error) {
    console.error("Error fetching best sellers skincare: ", error);
    next(error);
  }
};

// GET LATEST SKINCARE
export const getSkincareLatestProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const latestProducts = await FeaturedCategorySkincare.findOne({ name: "Latest" })
    .populate({
      path: "products",
      // select: "-_id title price rating thumbnail", // Optional: Select specific fields
    });

    res.status(200).json({
      success: true,
      total: latestProducts?.products.length,
      latestProducts,
    });

  } catch (error) {
    console.error("Error fetching latest skincare: ", error);
    next(error);
  }
};
