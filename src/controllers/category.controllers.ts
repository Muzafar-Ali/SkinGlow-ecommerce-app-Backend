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
import { SkincareCategory } from "../models/categories/skincare.model";


// CREATE CHEEK MAKEUP CATEGORY
export const createCheekMakeupCategoryHandler = async (
  req: Request<{}, {}, CheekMakeupSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);

    const { name } = req.body;

    const category = await createCategory(name, CheekMakeupCategory);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("cheekMakeupCategoryHandler", error);
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
    console.log("cheekMakeupCategoryHandler", error);
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
    console.log("cheekMakeupCategoryHandler", error);
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
    console.log("cheekMakeupCategoryHandler", error);
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
    console.log("cheekMakeupCategoryHandler", error);
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

// GET CHEEK MAKEUP CATEGORY
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

// GET LIPS MAKEUP CATEGORY
export const getLipsMakeupCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(LipsMakeupCategory);

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

// GET EYES MAKEUP CATEGORY
export const getEyesMakeupCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(EyesMakeupCategory);

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
    console.log("getCheekMakeupCategoryHandler", error);
    next(error);
  }
};

// GET SKINCARE CATEGORY
export const getSkinCareCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(SkincareCategory);

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

// GET SKIN CONDITION CATEGORY
export const getSkinConditionCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await getCategory(SkinConditionCategory);

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
    console.log("getCheekMakeupCategoryHandler", error);
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
    console.error("Error fetching best sellers: ", error);
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
    console.error("Error fetching best sellers: ", error);
    next(error);
  }
};
