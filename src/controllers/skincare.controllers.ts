import { NextFunction, Request, Response } from "express";
import { createSkincareProduct } from "../services/skincareProduct.services";
import { SkincareSchemaType } from "../schema/skincareProduct.schema";
import { SkinCareProduct } from "../models/products/skincare.model";

// CREATE PRODUCT
export const createSkincareProductHandler = async (
  req: Request<{}, {}, SkincareSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createSkincareProduct(req.body);

    res.status(201).json({
      success: true,
      message: "product created successfuly",
    });
  } catch (error) {
    console.log("createSkincareProductHandler error: ", error);
    next(error);
  }
};

// GET ALL PRODUCTS
export const getAllSkincareProductHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const makeupProduct = await SkinCareProduct.find();

    res.status(200).json({
      success: true,
      total: makeupProduct.length,
      makeupProduct,
    });
  } catch (error) {
    console.log("getAllProductsHandler error: ", error);
    next(error);
  }
}

// GET COLLECTION
export const getSkincareProductCollectionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await SkinCareProduct.find().sort({ createdAt: -1 }).limit(8);

    res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    console.log("getAllProductsHandler error: ", error);
    next(error);
  }
}
  
  
  