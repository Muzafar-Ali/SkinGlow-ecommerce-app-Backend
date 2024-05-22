import { NextFunction, Request, Response } from "express";
import { createMakeupProduct, getCategoryModel } from "../services/makeupProduct.service";
import { MakeupProduct } from "../models/makeup.model";
import { MakeupSchemaType } from "../schema/makeupProduct.schema";
import ErrorHandler from "../utils/errorClass";
import { GetMakeupProductByCategorySchemaType } from "../schema/query.schema";

export const createMakeupProductHandler = async (
  req: Request<{}, {}, MakeupSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createMakeupProduct(req.body);

    res.status(201).json({
      success: true,
      message: "product created successfuly",
    });
  } catch (error) {
    console.log("createMakeupProductHandler error: ", error);
    next(error);
  }
};


export const getMakeupProductByCategoryHandler = async (req: Request<{}, {}, {}, GetMakeupProductByCategorySchemaType["qery"]>, res: Response, next: NextFunction) => {
  try {

    const { cat, val} = req.query;

    // Determine category model based on val (assuming format)
    const categoryModel = getCategoryModel(cat);

    const category = await categoryModel.findOne({slug: val});

    if(!category) return next(new ErrorHandler(404, `${val} category not found`));
      
    const makeupProduct = await MakeupProduct.find({
      $or: [
        { "categories.cheekMakeupCategory": { $eq: String(category._id) } },
        { "categories.eyesMakeupCategory": { $eq: String(category._id) } },
        { "categories.lipsMakeupCategory": { $eq: String(category._id) } },
      ],
    });

    res.status(200).json({
      success: true,
      category: category.name,
      total: makeupProduct.length,
      makeupProduct,
    });
    
  } catch (error) {
    console.log("getMakeupProductByCategoryHandler error: ", error);
    next(error);
  }
};

export const getAllMakeupProductsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const makeupProduct = await MakeupProduct.find();

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


