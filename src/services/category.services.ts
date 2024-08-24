import ErrorHandler from "../utils/errorClass";

type GetCategoryType = {
  name: string;
  slug: string;
  products: any[];
}[];

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

export const getCategory = async (categoryModel: any, categoryName?: string) => {
  try {
    let category: GetCategoryType | null = null;

    if (categoryName) category = await categoryModel.find({slug: categoryName}).populate("products");
    if (!categoryName) category = await categoryModel.find().populate("products");

    if (!category) throw new ErrorHandler(404, "Category not found");

    return category;
  } catch (error) {
    throw error;
  }
};