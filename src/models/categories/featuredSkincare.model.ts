import mongoose from "mongoose";
import { FeaturedCategoryType } from "../../types/types";

const featuredSkincareSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  slug: { 
    type: String 
  }, 
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "SkinCareProduct",
    required: false
  }
});
  
  // Pre-save hook to generate the slug from the title
  featuredSkincareSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next(); // Skip if title hasn't changed
  
    // Generate the slug from the title
    this.slug = this.name!.toLowerCase().split(" ").join("-");
    next();
  });

export const FeaturedCategorySkincare = mongoose.model<FeaturedCategoryType>('FeaturedCategorySkincare', featuredSkincareSchema);
