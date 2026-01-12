import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { dataPhones, Phones } from "./data";
import {
  PhoneSchema,
  PhoneCreateSchema,
  PhoneUpdateSchema,
} from "../type/schema";
import { prisma } from "@/lib/prisma";

export const phoneRoutes = new OpenAPIHono();

const getPhonesRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Get all phones",
  responses: {
    200: {
      content: { "application/json": { schema: z.array(PhoneSchema) } },
      description: "List of phones",
    },
  },
});

const postPhoneRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Create a new phone",
  request: {
    body: {
      content: { "application/json": { schema: PhoneCreateSchema } },
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: PhoneSchema } },
      description: "Phone created",
    },
    400: { description: "Validation Error" },
    409: { description: "Slug already exists" },
  },
});

const getPhoneBySlugRoute = createRoute({
  method: "get",
  path: "/{slug}",
  summary: "Get phone by slug",
  request: {
    params: z.object({
      slug: z.string().openapi({ example: "iphone-15" }),
    }),
  },
  responses: {
    200: {
      content: { "application/json": { schema: PhoneSchema } },
      description: "Phone detail",
    },
    404: { description: "Phone not found" },
  },
});

const deletePhoneBySlugRoute = createRoute({
  method: "delete",
  path: "/{slug}",
  summary: "Delete a phone",
  request: {
    params: z.object({
      slug: z.string().openapi({ example: "iphone-17" }),
    }),
  },
  responses: {
    200: {
      description: "Success message",
      content: {
        "application/json": { schema: z.object({ message: z.string() }) },
      },
    },
    404: { description: "Phone not found" },
  },
});

const patchPhoneRoute = createRoute({
  method: "patch",
  path: "/{id}",
  summary: "Update phone data",
  request: {
    params: z.object({
      id: z.number().openapi({ example: 1 }),
    }),
    body: {
      content: { "application/json": { schema: PhoneUpdateSchema } },
    },
  },
  responses: {
    200: {
      description: "Updated phone object",
      content: { "application/json": { schema: PhoneSchema } },
    },
    404: { description: "Phone not found" },
  },
});

phoneRoutes.openapi(getPhonesRoute, async (c) => {
  const phones = await prisma.phone.findMany();
  return c.json(phones);
});

phoneRoutes.openapi(getPhoneBySlugRoute, (c) => {
  const { slug } = c.req.valid("param");

  return c.json({}, 200);
});

phoneRoutes.openapi(postPhoneRoute, async (c) => {
  return c.json({}, 201);
});

phoneRoutes.openapi(deletePhoneBySlugRoute, (c) => {
  return c.json({ message: "Phone deleted successfully" }, 200);
});

phoneRoutes.openapi(patchPhoneRoute, (c) => {
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  return c.json({}, 200);
});
