import { z } from "zod";

export const phoneCreateSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  slug: z.string().min(1),
  price: z.number().positive(),
  os: z.string().min(1),
  releaseYear: z.number().int().min(2000),
});

export const phoneUpdateSchema = phoneCreateSchema.partial();

export type PhoneCreateInput = z.infer<typeof phoneCreateSchema>;
export type PhoneUpdateInput = z.infer<typeof phoneUpdateSchema>;
