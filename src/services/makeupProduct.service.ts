import mongoose, { Model } from "mongoose";
import config from "../config/config";
import { CheekMakeupCategory } from "../models/categories/cheekMakeup.model";
import { EyesMakeupCategory } from "../models/categories/eyesMakeup.model";
import { LipsMakeupCategory } from "../models/categories/lipsMakeup.model";
import { MakeupProduct } from "../models/makeup.model";
import { MakeupDocumentInputType } from "../types/types";
import ErrorHandler from "../utils/errorClass";
import { MakeupSchemaType } from "../schema/makeupProduct.schema";
import { FeaturedCategory } from "../models/categories/featuredMakeup.model";

export const createMakeupProduct = async (requestInput: MakeupSchemaType["body"]) => {
  try {
    const product = await MakeupProduct.create(requestInput);
    const id = requestInput.categories.featuredCategory;
    const cat = await FeaturedCategory.findOne({ _id: id });
    await FeaturedCategory.findByIdAndUpdate(id, { $push: { products: product._id } });

    if (!product) throw new Error("Product not created");

    return product;
  } catch (error) {
    throw error;
  }
};

export const getCategoryModel = (val: string) => {
  let categoryModel: Model<any>;

  const cat = val.toLowerCase();

  if (cat.startsWith("cheek")) {
    categoryModel = CheekMakeupCategory;
  } else if (cat.startsWith("eyes")) {
    categoryModel = EyesMakeupCategory;
  } else if (cat.startsWith("lips")) {
    categoryModel = LipsMakeupCategory;
  } else {
    throw new ErrorHandler(400, "Invalid category format");
  }

  return categoryModel;
};
