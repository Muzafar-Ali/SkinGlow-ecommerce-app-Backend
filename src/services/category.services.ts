import { CheekMakeupCategory } from "../models/categories/cheekMakeup.model";
import { EyesMakeupCategory } from "../models/categories/eyesMakeup.model";
import { LipsMakeupCategory } from "../models/categories/lipsMakeup.model";
import ErrorHandler from "../utils/errorClass";

export const createCategory = async (name: string, categoryModel: any) => {
  try {
    if (!name) throw new ErrorHandler(400, "input field missing");

    const isCategoryExist = await categoryModel.findOne({ name });

    if (isCategoryExist) throw new ErrorHandler(400, "Category already exist");

    const category = await categoryModel.create({ name });

    if (!category) throw new ErrorHandler(500, "Category not created");

    return category;
  } catch (error) {
    throw error;
  }
};

export const getCategory = async (categoryModel: any) => {
  try {
    const category = await categoryModel.find();

    if (!category) throw new ErrorHandler(404, "Category not found");

    return category;
  } catch (error) {
    throw error;
  }
};
