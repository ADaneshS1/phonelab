import { Hono } from "hono";

export const commonRoutes = new Hono();

commonRoutes.get("/", (c) => {
  return c.json({
    title: "PHONELAB API",
    phone: "/phones",
  });
});
