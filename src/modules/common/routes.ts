import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

export const commonRoutes = new OpenAPIHono();

const getRootRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Health Check / Root API",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            title: z.string().openapi({ example: "PhoneLab API" }),
            phone: z.string().openapi({ example: "/phones" }),
          }),
        },
      },
      description: "Root endpoint information",
    },
  },
});

commonRoutes.openapi(getRootRoute, (c) => {
  return c.json(
    {
      title: "PhoneLab API",
      phone: "/phones",
    },
    200
  );
});
