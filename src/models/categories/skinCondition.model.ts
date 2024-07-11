import mongoose from "mongoose";

const skinConditionSchema = new mongoose.Schema({
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
skinConditionSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  // Generate the slug from the title
  this.slug = this.name!.toLowerCase().split(" ").join("-");
  next();
});

export const SkinConditionCategory = mongoose.model("SkinConditionCategory", skinConditionSchema);
