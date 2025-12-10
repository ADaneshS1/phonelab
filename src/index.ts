import { Hono } from "hono";
import { logger } from "hono/logger";

import { phoneRoutes } from "./modules/phone/routes";
import { commonRoutes } from "./modules/common/routes";

const app = new Hono();

app.use(logger());

app.route("/", commonRoutes);

app.route("/phones", phoneRoutes);

export default app;
