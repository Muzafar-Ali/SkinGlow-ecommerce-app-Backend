import { NextFunction, Request, Response } from "express";
import { createMakeupProduct, getCategoryModel } from "../services/makeupProduct.service";
import { MakeupProduct } from "../models/products/makeup.model";
import { MakeupSchemaType } from "../schema/makeupProduct.schema";
import ErrorHandler from "../utils/errorClass";
import { GetMakeupProductByCategorySchemaType } from "../schema/query.schema";
import { uploadonToCloudinary } from "../utils/cloudinary";
import path from "path";
import fs from 'fs'

// CREATE PRODUCTS
export const createMakeupProductHandler = async (
  req: Request<{}, {}, MakeupSchemaType["body"]>,
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
        
        const result = await uploadonToCloudinary(imagePath, title, "makeup", counter);

        imagesArray.push(result?.secure_url)

      } catch (error) {
        console.error(`Error uploading ${image}: `, error);
      }
    }

    // Construct the full path to the thumbnail file.
    const thumbnailPath = path.join(directoryPathThumbnail, thumbnail[0]);
    const thumbailResult = await uploadonToCloudinary(thumbnailPath, title, "makeup" )

    await createMakeupProduct(req.body, thumbailResult?.secure_url, imagesArray);

    res.status(201).json({
      success: true,
      message: "product created successfuly",
    });
  } catch (error) {
    console.log("createMakeupProductHandler error: ", error);
    next(error);
  }
};

// GET PRODUCT BY CATEGORY
export const getMakeupProductByCategoryHandler = async (req: Request<{}, {}, {}, GetMakeupProductByCategorySchemaType["query"]>, res: Response, next: NextFunction) => {
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

// GET ALL PRODUCTS
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

// GET SINGLE PRODUCT
export const getSingleMakeupProductHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {  
    const { slug } = req.params;
    
    const makeupProduct = await MakeupProduct.find({slug: slug}) 
    .populate('categories.cheekMakeupCategory')
    .populate('categories.eyesMakeupCategory')
    .populate('categories.lipsMakeupCategory')
    
    let category;

    if(makeupProduct[0]?.categories.cheekMakeupCategory){
      category = makeupProduct[0]?.categories.cheekMakeupCategory.name
    }

    if(makeupProduct[0]?.categories.eyesMakeupCategory){
      category = makeupProduct[0]?.categories.eyesMakeupCategory.name
    }

    if(makeupProduct[0]?.categories.lipsMakeupCategory){
      category = makeupProduct[0]?.categories.lipsMakeupCategory.name
    }

    if (!makeupProduct) return next(new ErrorHandler(404, "Product not found"));
    console.log('work 1');
    
    res.status(200).json({
      success: true,
      makeupProduct,
    });
  } catch (error) {
    console.log("getSingleProductHandler error: ", error);
    next(error);
  }
}

// UPLOAD IMAGE 
export const uploadImagesHanlder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({
      success: true,
      message: "Images uploaded successfuly",
    });
  } catch (error) {
    console.log("uploadImages error: ", error);
    next(error);
  }
}

// export const getTemporryImages = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const directoryPath = path.join(__dirname, '..', '..', 'uploads', 'images');

//     fs.readdir(directoryPath, (err, files) => {
//       if (err) {
//         console.error('Error reading directory:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }

//       const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

//       res.status(200).json({
//         success: true,
//         total: imageFiles.length,
//         imageFiles,
//       });
//     });
//   } catch (error) {
//     console.log("getTemporryImages error: ", error);
//     next(error);
//   }
// }


// GET SINGLE PRODUCT
// export const checkMakeupProductHandler = async (req: Request, res: Response, next: NextFunction) => {
//   try {  
//     const { slug } = req.params;

//     const makeupProduct = await MakeupProduct.findOne({slug: slug}) 
//     .populate('categories.cheekMakeupCategory')
//     .populate('categories.eyesMakeupCategory')
//     .populate('categories.lipsMakeupCategory')

//     let category;

//     if(makeupProduct?.categories.cheekMakeupCategory){
//       category = makeupProduct?.categories.cheekMakeupCategory.name
//     }

//     if(makeupProduct?.categories.eyesMakeupCategory){
//       category = makeupProduct?.categories.eyesMakeupCategory.name
//     }

//     if(makeupProduct?.categories.lipsMakeupCategory){
//       category = makeupProduct?.categories.lipsMakeupCategory.name
//     }




//     // const featuredCategory = await FeaturedCategoryMakeup.findOne({ slug }).populate({
//     //   path: 'products',
//     //   model: 'MakeupProduct'
//     // });

//     if (!makeupProduct) return next(new ErrorHandler(404, "Product not found"));

//     res.status(200).json({
//       success: true,
//       makeupProduct,
//       category,
//     });
//   } catch (error) {
//     console.log("getSingleProductHandler error: ", error);
//     next(error);
//   }
// }