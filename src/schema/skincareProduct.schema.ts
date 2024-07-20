import z, { object } from "zod";
import { ProductDetailsSchema } from "./makeupProduct.schema";

const CategoriesSchema = z.object({
  skincare: object({
    skinConditionCategory: z.string({
      invalid_type_error: "Skin condition category must be a string",
    }).optional(),
    skinCareCategory: z.string({
      invalid_type_error: "Skin care category must be a string",
    }).optional(),
    featuredCategory: z.string({
      invalid_type_error: "Featured category must be a string",
    }).optional(),
  })
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

    // thumbnail: z.string({
    //   required_error: "Thumbnail is required",
    //   invalid_type_error: "Thumbnail must be a string",
    // }),

    // images: z.array(
    //   z.string({
    //     required_error: "Images are required",
    //     invalid_type_error: "Each image link must be a string",
    //   })
    // ),
    stock: z.number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    }).positive(),

    productDetails: ProductDetailsSchema,
    categories: CategoriesSchema,
  }),
});

export type SkincareSchemaType = z.infer<typeof SkincareSchema>;
