import { NextFunction, Request, Response } from "express";
import { createSkincareProduct } from "../services/skincareProduct.services";
import { SkincareSchemaType } from "../schema/skincareProduct.schema";
import { SkinCareProduct } from "../models/products/skincare.model";
import { uploadonToCloudinary } from "../utils/cloudinary";
import path from "path";
import fs from 'fs'

// CREATE PRODUCTS
export const createSkincareProductHandler = async (
  req: Request<{}, {}, SkincareSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const directoryPathImages = path.join(__dirname, '..', '..', 'uploads', 'images');
    const directoryPathThumbnail = path.join(__dirname, '..', '..', 'uploads', 'thumbnail');
        
    const files = fs.readdirSync(directoryPathImages);
    const thumbnail = fs.readdirSync(directoryPathThumbnail);
    const { title } = req.body

    // Initialize a counter to keep track of the image number for each upload.
    let counter = 0;
    let imagesArray = [];

    for (const image of files) {
      try {
        // Increment the counter for each image.
        counter++;

        // Construct the full path to the image file.
        const imagePath = path.join(directoryPathImages, image);
        
        const result = await uploadonToCloudinary(imagePath, title, "skincare", counter );

        imagesArray.push(result?.secure_url)

      } catch (error) {
        console.error(`Error uploading ${image}: `, error);
      }
    }

    // Construct the full path to the thumbnail file.
    const thumbnailPath = path.join(directoryPathThumbnail, thumbnail[0]);
    const thumbailResult = await uploadonToCloudinary(thumbnailPath, title, "skincare" )


    await createSkincareProduct(req.body, thumbailResult?.secure_url, imagesArray);

    res.status(201).json({
      success: true,
      message: "product created successfuly",
    });
  } catch (error) {
    console.log("createMakeupProductHandler error: ", error);
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
  
  
  