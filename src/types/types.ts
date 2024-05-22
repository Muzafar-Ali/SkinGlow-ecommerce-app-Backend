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
    cheekMakeupCategory?: {
      _id: string
    };
    eyesMakeupCategory?: {
      _id: string
    };
    lipsMakeupCategory?: {
      _id: string
    };
    featuredCategory?: {
      _id: string
    };
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
    skinCareCategory?: {
      _id: string
    };
    skinConditionCategory?: {
      _id: string
    };
    featuredCategory?: {
      _id: string
    };
  }
}

export type skinCareDocumentType = skinCareDocumentInputType & {
  createdAt: Date;
  updatedAt: Date;
}

export type CheekMakeupCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
}

export type EyesMakeupCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
}

export type LipsMakeupCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
}

export type FeaturedCategoryType = mongoose.Document & {
  name: string;
  slug?: string;
}