import { NextFunction, Request, Response } from "express";
import { createCategory, getCategory } from "../services/category.services";
import { CheekMakeupCategory } from "../models/categories/cheekMakeup.model";
import { EyesMakeupCategory } from "../models/categories/eyesMakeup.model";
import { LipsMakeupCategory } from "../models/categories/lipsMakeup.model";
import { CheekMakeupSchemaType, EyesMakeupSchemaType, FeaturedSchemaType, LipsMakeupSchemaType } from "../schema/category.schema";
import { FeaturedCategory } from "../models/categories/featured.model";

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

export const createFeaturedCategoryHandler = async (
  req: Request<{}, {}, FeaturedSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const category = await createCategory(name, FeaturedCategory);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("cheekMakeupCategoryHandler", error);
    next(error);
  }
};

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
