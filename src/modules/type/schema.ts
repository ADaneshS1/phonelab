import { z } from "@hono/zod-openapi";

export const PhoneSchema = z
  .object({
    id: z.number().positive().openapi({ example: 1 }),
    brand: z.string().min(1).openapi({ example: "Apple" }),
    model: z.string().min(1).openapi({ example: "iPhone 15 Pro" }),
    slug: z.string().min(1).openapi({ example: "iphone-15-pro" }),
    price: z.number().positive().openapi({ example: 18000000 }),
    os: z.string().min(1).openapi({ example: "iOS 17" }),
    chipset: z.string().min(1).openapi({ example: "A17 Pro" }),
    releaseYear: z.number().int().min(2000).openapi({ example: 2023 }),
    createdAt: z.date().openapi({ type: "string", format: "date-time" }),
    updatedAt: z.date().openapi({ type: "string", format: "date-time" }),
  })
  .openapi("Phone");

export const PhoneCreateSchema = PhoneSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).openapi("PhoneCreate");

export const PhoneUpdateSchema =
  PhoneCreateSchema.partial().openapi("PhoneUpdate");

export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneCreateInput = z.infer<typeof PhoneCreateSchema>;
export type PhoneUpdateInput = z.infer<typeof PhoneUpdateSchema>;
