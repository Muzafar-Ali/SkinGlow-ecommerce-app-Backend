import { title } from "process";
import z from "zod";

export const ProductDetailsSchema = z.object({
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }).trim().min(1, "Description is required"),
  ingredients: z.string({
    required_error: "Ingredients are required",
    invalid_type_error: "Ingredients must be a string",
  }).trim().min(1, "Ingredients are required"),
  howToApply: z.string({
    required_error: "How to Apply instructions are required",
    invalid_type_error: "How to Apply instructions must be a string",
  }).trim().min(1, "How to Apply instructions are required"),
  features: z.string({
    required_error: "Features are required",
    invalid_type_error: "Features must be a string",
  }).trim().min(1, "Features are required"),
});

const CategoriesSchema = z.object({
  cheekMakeupCategory: z.string({
    invalid_type_error: "Cheek makeup category must be a string",
  }).optional(),
  eyesMakeupCategory: z.string({
    invalid_type_error: "Eyes makeup category must be a string",
  }).optional(),
  lipsMakeupCategory: z.string({
    invalid_type_error: "Lips makeup category must be a string",
  }).optional(),
  featuredCategory: z.string({
    invalid_type_error: "Lips makeup category must be a string",
  }).optional(),
});

export const MakeupSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      })
      .trim(),

    tagline: z
      .string({
        required_error: "Tagline is required",
        invalid_type_error: "Tagline must be a string",
      })
      .trim(),

    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .positive(),

    images: z.array(
      z.string({
        required_error: "Images are required",
        invalid_type_error: "Each image link must be a string",
      })
    ),

    productDetails: ProductDetailsSchema,
    categories: CategoriesSchema,
  }),
});

export type MakeupSchemaType = z.infer<typeof MakeupSchema>;
