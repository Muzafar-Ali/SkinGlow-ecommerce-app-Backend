import mongoose from "mongoose";

const skinConditionCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  // products: [{ type: mongoose.Types.ObjectId, ref: 'SkinConditionProduct' }]
});

export const SkinConditionCategory = mongoose.model('SkinConditionCategory', skinConditionCategorySchema);