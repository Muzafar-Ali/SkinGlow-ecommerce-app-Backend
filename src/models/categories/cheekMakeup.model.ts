import mongoose from "mongoose";
import { CheekMakeupCategoryType } from "../../types/types";

const cheekMakeupSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true, 
      unique: true 
    },
    slug: { 
      type: String 
    }, 
  });
  
  // Pre-save hook to generate the slug from the title
  cheekMakeupSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next(); // Skip if title hasn't changed
  
    // Generate the slug from the title
    this.slug = this.name!.toLowerCase().split(" ").join("-");
    next();
  });

export const CheekMakeupCategory = mongoose.model<CheekMakeupCategoryType>('CheekMakeupCategory', cheekMakeupSchema);
