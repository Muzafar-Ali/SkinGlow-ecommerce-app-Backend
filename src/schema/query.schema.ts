import z from "zod";

export const getMakeupProductByCategorySchema = z.object({
  qery: z.object({
    cat: z.string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    }),
    // cat2: z.string({
    //     invalid_type_error: "Category must be a string",
    //   }).optional(),
    // cat3: z.string({
    //     invalid_type_error: "Category must be a string",
    //   }).optional(),
    val: z.string({
      required_error: "Value is required",
      invalid_type_error: "Value must be a string",
    }),
    // val2: z.string({
    //     invalid_type_error: "Value must be a string",
    //   }).optional(),
    // val3: z.string({
    //     invalid_type_error: "Value must be a string",
    //   }).optional(),
  }),
});

export type GetMakeupProductByCategorySchemaType = z.infer<typeof getMakeupProductByCategorySchema>;