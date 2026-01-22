import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";

import { phoneRoutes } from "./modules/phone/routes";
import { Scalar } from "@scalar/hono-api-reference";

const app = new OpenAPIHono();

app.use(logger());

app.route("/phones", phoneRoutes);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "PHONELAB API",
    version: "1.0.0",
    description: "API documentation for mobile device data management",
  },
  servers: [{ url: "http://localhost:3000" }],
});

app.get(
  "/",
  Scalar({
    spec: { url: "/openapi.json" },
    theme: "deepSpace",
  } as any)
);

export default app;
