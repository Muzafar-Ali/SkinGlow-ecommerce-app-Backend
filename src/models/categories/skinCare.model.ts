import mongoose from "mongoose";

const skinCareSchema = new mongoose.Schema({
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
skinCareSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  
  // Generate the slug from the title
  this.slug = this.name!.toLowerCase().split(" ").join("-");
  next();
});

export const SkinCareCategory = mongoose.model('SkinCareCategory', skinCareSchema);
