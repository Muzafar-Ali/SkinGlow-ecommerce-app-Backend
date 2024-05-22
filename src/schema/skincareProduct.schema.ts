import { title } from "process";
import z from "zod";
import { ProductDetailsSchema } from "./makeupProduct.schema";

const CategoriesSchema = z.object({
    skinConditionCategory: z.string({
      invalid_type_error: "Skin condition category must be a string",
    }).optional(),
    skinCareCategory: z.string({
      invalid_type_error: "Skin care category must be a string",
    }).optional(),
    featuredCategory: z.string({
      invalid_type_error: "Lips makeup category must be a string",
    }).optional(),
});

export const SkincareSchema = z.object({
  body: z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      }).trim(),

    tagline: z.string({
        required_error: "Tagline is required",
        invalid_type_error: "Tagline must be a string",
      }).trim(),

    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      }).positive(),

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

export type SkincareSchemaType = z.infer<typeof SkincareSchema>;
