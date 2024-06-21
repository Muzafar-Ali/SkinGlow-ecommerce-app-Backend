import { FeaturedCategorySkincare } from "../models/categories/featuredSkincare.model";
import { SkinCareProduct } from "../models/products/skincare.model";
import { SkincareSchemaType } from "../schema/skincareProduct.schema";

export const createSkincareProduct = async (requestInput: SkincareSchemaType["body"]) => {
  try {
    const featureCatId = requestInput.categories?.featuredCategory ?? ""
    
    // Creates a new makeup product
    if(!featureCatId){
      const product = await SkinCareProduct.create(requestInput);
      if (!product) throw new Error("Product not created");

      return product;
    }

    // Creates a new makeup product and adds it to the featured category
    if(featureCatId){
      const product = await SkinCareProduct.create(requestInput);
      if (!product) throw new Error("Product not created");
      
      const result = await FeaturedCategorySkincare.findByIdAndUpdate(
        featureCatId,
        { $push: { products: product._id } },
        { new: true}
      );
      
      const added = result?.products.includes(product._id)    
      if(!added) throw new Error("Product not added to featured category");
      
      return product;
    }

  } catch (error) {
    throw error;
  }
};