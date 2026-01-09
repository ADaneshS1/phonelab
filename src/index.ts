import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { apiReference } from "@scalar/hono-api-reference";

import { phoneRoutes } from "./modules/phone/routes";
import { commonRoutes } from "./modules/common/routes";

const app = new OpenAPIHono();

app.use(logger());

app.route("/", commonRoutes);
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
  "/docs",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
    theme: "deepSpace",
  } as any)
);

export default app;
