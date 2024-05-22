import mongoose from "mongoose";
import { MakeupDocumentType } from "../types/types";

const makeupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    tagline: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    productDetails: {
      description: { type: String, required: true },
      ingredients: { type: String, required: true },
      howToApply: { type: String, required: true },
      features: { type: String, required: true },
    },
    categories: {
      cheekMakeupCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CheekMakeupCategory",
      },
      eyesMakeupCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EyesMakeupCategory",
      },
      lipsMakeupCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LipsMakeupCategory",
      },
      featuredCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeaturedCategory",
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate the slug from the title
makeupSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next(); // Skip if title hasn't changed

  // Generate the slug from the title
  this.slug = this.title.toLowerCase().split(" ").join("-");
  next();
});

export const MakeupProduct = mongoose.model<MakeupDocumentType>("MakeupProduct", makeupSchema);
