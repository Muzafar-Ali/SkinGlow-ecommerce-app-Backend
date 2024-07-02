import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import config from "../config/config";
import { shouldRetry } from "./helpers/shouldRetry";
import { retryUpload } from "./helpers/retryUpload";

// Cloudinary configuration
cloudinary.config({
  cloud_name: config.cloud,
  api_key: config.cloudinaryKey,
  api_secret: config.cloudinarySeceret,
});

export const uploadonToCloudinary = async (imagePath: string, title: string, product: string, counter?: number ) => {
  try {
    if (!imagePath) throw new Error("No file uploaded");

    // Folder structure setup for cloudinary
    const baseFolder = "products";
    let subFolder = product;
    const slug = title.toLowerCase().split(" ").join("-");
    
    // Combine the base folder, subfolder, and the product name to form the complete folder path
    const folderPath = `${baseFolder}/${subFolder}/${slug}`; // Include the product name in the folder path

    if (imagePath.includes("images")) {
      const result = await retryUpload(imagePath, {
        resource_type: "auto",
        public_id: `image${counter}`,
        folder: folderPath,
      });

      return result;
    }

    if (imagePath.includes("thumbnail")) {
      const result = await retryUpload(imagePath, {
        resource_type: "auto",
        public_id: `thumbnail${counter}`,
        folder: folderPath,
      });

      return result;
    }

    // Handle thumbnail upload logic (similar retry logic can be applied)
  } catch (error) {
    console.error("upload cloudinary error:", error);
    return null; // Or return an error object with more details
  }
};
