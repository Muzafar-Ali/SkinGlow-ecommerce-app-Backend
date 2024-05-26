import mongoose from "mongoose";

const skinConditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
});

// Pre-save hook to generate the slug from the title
skinConditionSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  // Generate the slug from the title
  this.slug = this.name!.toLowerCase().split(" ").join("-");
  next();
});

export const SkinConditionCategory = mongoose.model("SkinConditionCategory", skinConditionSchema);
