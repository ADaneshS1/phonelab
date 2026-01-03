import { z } from "zod";

export const PhoneSchema = z.object({
  id: z.number().positive(),
  brand: z.string().min(1),
  model: z.string().min(1),
  slug: z.string().min(1),
  price: z.number().positive(),
  os: z.string().min(1),
  chipset: z.string().min(1),
  releaseYear: z.number().int().min(2000),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const PhoneCreateSchema = PhoneSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const PhoneUpdateSchema = PhoneCreateSchema.partial();

export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneCreateInput = z.infer<typeof PhoneCreateSchema>;
export type PhoneUpdateInput = z.infer<typeof PhoneUpdateSchema>;
