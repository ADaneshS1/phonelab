import z from "zod";

export const BrandSchema = z
  .object({
    id: z.number().positive().openapi({ example: 1 }),
    name: z.string().min(1).openapi({ example: "Apple" }),
    slug: z.string().min(1).openapi({ example: "apple" }),
    createdAt: z.date().openapi({ type: "string", format: "date-time" }),
    updatedAt: z.date().openapi({ type: "string", format: "date-time" }),
  })
  .openapi("Brand");

export const BrandCreateSchema = BrandSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).openapi("BrandCreate");

export const BrandUpdateSchema =
  BrandCreateSchema.partial().openapi("BrandUpdate");

export type Brand = z.infer<typeof BrandSchema>;
export type BrandCreateInput = z.infer<typeof BrandCreateSchema>;
export type BrandUpdateInput = z.infer<typeof BrandUpdateSchema>;
