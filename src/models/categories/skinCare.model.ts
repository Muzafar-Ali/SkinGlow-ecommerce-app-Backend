import mongoose from "mongoose";

const skinCareCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  // products: [{ type: mongoose.Types.ObjectId, ref: 'SkinCareProduct' }]
});

export const SkinCareCategory = mongoose.model('SkinCareCategory', skinCareCategorySchema);
