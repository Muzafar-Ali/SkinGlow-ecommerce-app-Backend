import mongoose from "mongoose";
import { skinCareDocumentType } from "../../types/types";

const skinCareSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    slug: { 
      type: String 
    },
    tagline: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    thumbnail: { 
      type: String, 
      required: true 
    },
    images: { 
      type: [String], 
      required: true 
    },
    stock: { 
      type: Number, 
      required: true 
    },
    productDetails: {
      description: { 
        type: String, 
        required: true 
      },
      ingredients: { 
        type: String, 
        required: true 
      },
      howToApply: { 
        type: String, 
        required: true 
      },
      features: { 
        type: String, 
        required: true 
      },
    },
    categories: {
      skincare: {
        skinConditionCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SkinConditionCategory",
          required: false,
        },
        skinCareCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SkincareCategory",
          required: false,
        },
        featuredCategory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "FeaturedCategorySkincare",
          required: false,
        },
      }
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate the slug from the title
skinCareSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next(); // Skip if title hasn't changed

  // Generate the slug from the title
  this.slug = this.title.toLowerCase().split(" ").join("-");
  next();
});

export const SkinCareProduct = mongoose.model<skinCareDocumentType>("SkinCareProduct", skinCareSchema);
