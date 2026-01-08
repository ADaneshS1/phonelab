import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { dataPhones, Phones } from "./data";
import {
  PhoneSchema,
  PhoneCreateSchema,
  PhoneUpdateSchema,
} from "../type/schema";

let phones: Phones = dataPhones;
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
      id: z.string().openapi({ example: "1" }),
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

phoneRoutes.openapi(getPhonesRoute, (c) => {
  return c.json(phones, 200);
});

phoneRoutes.openapi(getPhoneBySlugRoute, (c) => {
  const { slug } = c.req.valid("param");
  const phone = phones.find((p) => p.slug === slug);

  if (!phone) return c.json({ message: "Not Found" }, 404);
  return c.json(phone, 200);
});

phoneRoutes.openapi(postPhoneRoute, async (c) => {
  const data = c.req.valid("json");

  const slugExists = phones.find(
    (p) => p.slug.toLowerCase() === data.slug.toLowerCase()
  );

  if (slugExists) {
    return c.json({ message: "Slug has been used" }, 409);
  }

  const newPhone = {
    id: phones.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  phones.push(newPhone);
  return c.json(newPhone, 201);
});

phoneRoutes.openapi(deletePhoneBySlugRoute, (c) => {
  const { slug } = c.req.valid("param");
  const index = phones.findIndex((p) => p.slug === slug);

  if (index === -1) return c.json({ message: "Phone not found" }, 404);

  phones.splice(index, 1);
  return c.json({ message: "Phone deleted successfully" }, 200);
});

phoneRoutes.openapi(patchPhoneRoute, (c) => {
  const id = Number(c.req.valid("param").id);
  const body = c.req.valid("json");

  const phone = phones.find((p) => p.id === id);
  if (!phone) return c.json({ message: "Phone not found" }, 404);

  const updatedPhone = {
    ...phone,
    ...body,
    updatedAt: new Date(),
  };

  phones = phones.map((p) => (p.id === id ? updatedPhone : p));
  return c.json(updatedPhone, 200);
});
