import { Hono } from "hono";
import { dataPhones } from "./data";

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