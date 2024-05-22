import mongoose from "mongoose";

const lipsMakeupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
});

// Pre-save hook to generate the slug from the title
lipsMakeupSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next(); 

  // Generate the slug from the title
  this.slug = this.name!.toLowerCase().split(" ").join("-");
  next();
});

export const LipsMakeupCategory = mongoose.model('LipsMakeupCategory', lipsMakeupSchema);
