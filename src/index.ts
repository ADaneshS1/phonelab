import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    title: "PHONELAB APi",
    phone: "/phones",
  });
});

export default app;
