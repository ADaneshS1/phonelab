import { Hono } from "hono";
import { dataPhones } from "./data";

export const phoneRoutes = new Hono();

phoneRoutes.get("/", (c) => {
  return c.json(dataPhones);
});

phoneRoutes.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const searchPhone = dataPhones.find((phone) => phone.slug === slug);

  if (!searchPhone) {
    return c.notFound();
  }

  return c.json(searchPhone);
});
