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

const putPhoneByIdRoute = createRoute({
  method: "put",
  path: "/{id}",
  summary: "Update a phone by id",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({ example: 1 }),
    }),
    body: {
      content: {
        "application/json": {
          schema: PhoneUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Phone updated successfully",
      content: {
        "application/json": {
          schema: PhoneSchema,
        },
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
      id: z.coerce.number().openapi({ example: 1 }),
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

//------------OPENAPI--------------
phoneRoutes.openapi(getPhonesRoute, async (c) => {
  const phones = await prisma.phone.findMany();
  return c.json(phones);
});

phoneRoutes.openapi(getPhoneBySlugRoute, async (c) => {
  const { slug } = c.req.valid("param");
  const phone = await prisma.phone.findUnique({
    where: { slug: slug },
  });
  if (!phone) {
    return c.json({ message: "Phone not found" }, 404);
  }
  return c.json(phone, 200);
});

phoneRoutes.openapi(postPhoneRoute, async (c) => {
  const data = c.req.valid("json");
  const newPhone = await prisma.phone.create({
    data: {
      brand: data.brand,
      model: data.model,
      slug: data.slug,
      price: data.price,
      os: data.os,
      chipset: data.chipset,
      releaseYear: data.releaseYear,
    },
  });
  return c.json(newPhone, 201);
});

phoneRoutes.openapi(deletePhoneBySlugRoute, async (c) => {
  const { slug } = c.req.valid("param");
  const phone = await prisma.phone.delete({
    where: { slug: slug },
  });
  return c.json({ message: "Phone deleted successfully" }, 200);
});

// phoneRoutes.openapi(patchPhoneRoute, (c) => {
//   const { id } = c.req.valid("param");
//   const body = c.req.valid("json");
//   return c.json({}, 200);
// });

phoneRoutes.openapi(putPhoneByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  try {
    const updated = await prisma.phone.update({
      where: { id: id },
      data: body,
    });
    return c.json(updated, 200);
  } catch (error: any) {
    if (error.code === "P2025") return c.json({ message: "Not Found" }, 404);
    return c.json({ message: "Error", error: error.message }, 500);
  }
});

phoneRoutes.openapi(patchPhoneRoute, async (c) => {
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  try {
    const updated = await prisma.phone.update({
      where: { id: id },
      data: body,
    });
    return c.json(updated, 200);
  } catch (error: any) {
    if (error.code === "P2025")
      return c.json({ message: "Phone ID not found" }, 404);
    return c.json({ message: "Error", error: error.message }, 500);
  }
});
