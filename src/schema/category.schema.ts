import z from "zod";

export const CheekMakeupShcema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1),
  }),
});

export const LipsMakeupSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1),
  }),
});

export const EyesMakeupSchema = z.object({
  body: z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      }).min(1),
  }),
});

export const FeaturedSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1),
    products: z.array(z.string()).optional(),
  }),
});

export const skinConditionSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1),
  }),
})

export const skinCareSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1),
  }),
})

export type CheekMakeupSchemaType = z.infer<typeof CheekMakeupShcema>;
export type LipsMakeupSchemaType = z.infer<typeof LipsMakeupSchema>;
export type EyesMakeupSchemaType = z.infer<typeof EyesMakeupSchema>;
export type FeaturedSchemaType = z.infer<typeof FeaturedSchema>;
export type SkinConditionSchemaType = z.infer<typeof skinConditionSchema>;
export type SkinCareSchemaType = z.infer<typeof skinCareSchema>;
