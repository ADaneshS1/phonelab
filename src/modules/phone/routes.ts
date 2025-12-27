import { Hono } from "hono";
import { dataPhones, Phones } from "./data";
import { phoneCreateSchema } from "../type/schema";
import { phoneUpdateSchema } from "../type/schema";

let phones: Phones = dataPhones;

export const phoneRoutes = new Hono();

phoneRoutes.get("/", (c) => {
  return c.json(phones);
});

phoneRoutes.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const phone = phones.find((phone) => phone.slug === slug);

  if (!phone) {
    return c.notFound();
  }

  return c.json(phone);
});

phoneRoutes.delete("/:slug", (c) => {
  const slug = c.req.param("slug");

  const index = phones.findIndex((phone) => phone.slug === slug);

  if (index === -1) {
    return c.notFound();
  }

  phones.splice(index, 1);

  return c.json({ message: "Phone deleted successfully" });
});

phoneRoutes.delete("/", (c) => {
  if (phones.length === 0) {
    return c.json(
      { message: "No phones to delete" },
      404
    );
  }

  phones.length = 0; // mengosongkan array

  return c.json({
    message: "All phones deleted successfully",
  });
});


phoneRoutes.post("/", async (c) => {
  const body = await c.req.json();

  const parsed = phoneCreateSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: "Failed to validate phone data",
        errors: parsed.error.flatten(),
      },
      400
    );
  }

  const data = parsed.data;

  const slugExists = phones.find(
    (phone) => phone.slug.toLowerCase() === parsed.data.slug.toLowerCase()
  );

  if (slugExists) {
    return c.json({ message: "Slug has been used" }, 409);
  }

  const newPhone = {
    id: dataPhones.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  phones.push(newPhone);

  return c.json(newPhone, 201);
});

phoneRoutes.put("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const body = await c.req.json();

  const parsed = phoneUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: "Failed to validate phone data",
        errors: parsed.error.flatten(),
      },
      400
    );
  }

  const phone = dataPhones.find((phone) => phone.slug === slug);
  if (!phone) {
    return c.notFound();
  }

  const newPhone = {
    ...phone,
    ...parsed.data,
    updatedAt: new Date(),
  };

  phones = phones.map((phone) => {
    if (phone.slug === slug) return newPhone;
    return phone;
  });

  return c.json(newPhone);
});