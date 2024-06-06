import mongoose from "mongoose";
import { FeaturedCategoryType } from "../../types/types";

const featuredMakeupSchema = new mongoose.Schema({
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
    ref: "MakeupProduct",
    required: false
  }
});
  
  // Pre-save hook to generate the slug from the title
  featuredMakeupSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next(); // Skip if title hasn't changed
  
    // Generate the slug from the title
    this.slug = this.name!.toLowerCase().split(" ").join("-");
    next();
  });

export const FeaturedCategoryMakeup = mongoose.model<FeaturedCategoryType>('FeaturedCategoryMakeup', featuredMakeupSchema);
