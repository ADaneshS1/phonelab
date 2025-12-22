import { Hono } from "hono";
import { dataPhones } from "./data";
import { phoneCreateSchema } from "../type/schema";
import { phoneUpdateSchema } from "../type/schema";

export const phoneRoutes = new Hono();

phoneRoutes.get("/", (c) => {
  return c.json(dataPhones);
});

phoneRoutes.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const phone = dataPhones.find((phone) => phone.slug === slug);

  if (!phone) {
    return c.notFound();
  }

  return c.json(phone);
});


phoneRoutes.delete("/:slug", (c) => {

  const slug = c.req.param("slug");

  const index = dataPhones.findIndex((phone) => phone.slug === slug);


  if (index === -1) {

    return c.notFound();

  }


  dataPhones.splice(index, 1);

  return c.json({ message: "Phone deleted successfully" });

}); 

phoneRoutes.post("/", async (c) => {
  const body = await c.req.json();

  const parsed = phoneCreateSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: "Validasi gagal",
        errors: parsed.error.flatten(),
      },
      400
    );
  }

  const data = parsed.data;

  const newPhone = {
    id: dataPhones.length + 1,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  dataPhones.push(newPhone);

  return c.json(
    {
      message: "Phone berhasil ditambahkan",
      data: newPhone,
    },
    201
  );
});


phoneRoutes.put("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const body = await c.req.json();

  const parsed = phoneUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: "Validasi gagal",
        errors: parsed.error.flatten(),
      },
      400
    );
  }

  const phone = dataPhones.find((p) => p.slug === slug);
  if (!phone) {
    return c.notFound();
  }

  Object.assign(phone, parsed.data, {
    updatedAt: new Date(),
  });

  return c.json({
    message: "Phone berhasil diperbarui",
    data: phone,
  });
});
