import { SkinCareProduct } from "../models/skincare.model";
import { SkincareSchemaType } from "../schema/skincareProduct.schema";

export const createSkincareProduct = async (requestInput: SkincareSchemaType["body"]) => {
  try {
    const product = await SkinCareProduct.create(requestInput);

    if (!product) throw new Error("Product not created");

    return product;
  } catch (error) {
    throw error;
  }
};
