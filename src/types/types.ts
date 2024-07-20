import mongoose from "mongoose";

export type MakeupDocumentInputType = mongoose.Document & {
  title: string;
  slug?: string;
  tagline: string;
  description: string;
  price: number;
  images: string[];
  productDetails: {
    description: string;
    ingredients: string;
    howToApply: string;
    features: string;
  },
  categories: {
    makeup: {
      cheekMakeupCategory?: {
        _id: string;
        name: string;
      };
      eyesMakeupCategory?: {
        _id: string;
        name: string;
      };
      lipsMakeupCategory?: {
        _id: string;
        name: string;
      };
      featuredCategory?: {
        _id: string;
        name: string;
      };
    }
  }
} 

export type MakeupDocumentType = MakeupDocumentInputType & {
  createdAt: Date;
  updatedAt: Date;
}

export type skinCareDocumentInputType = mongoose.Document & {
  title: string;
  slug?: string;
  tagline: string;
  description: string;
  price: number;
  images: string[];
  productDetails: {
    description: string;
    ingredients: string;
    howToApply: string;
    features: string;
  },
  categories: {
    skincare: {
      skinCareCategory?: {
        _id: string;
        name: string;
      };
      skinConditionCategory?: {
        _id: string;
        name: string;
      };
      featuredCategory?: {
        _id: string;
        name: string;
      };
    }
  }
}

export type skinCareDocumentType = skinCareDocumentInputType & {
  createdAt: Date;
  updatedAt: Date;
}

export type CheekMakeupCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
  products: string[];
}

export type EyesMakeupCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
  products: string[];
}

export type LipsMakeupCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
  products: string[];
}

export type FeaturedCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
  products: string[];
}
