import { Hono } from "hono";

export const phoneRoutes = new Hono();

phoneRoutes.get("/", (c) => {
  return c.json([
    { id: 1, brand: "Apple", model: "iPhone 14", price: 999, os: "iOS" },
    { id: 2, brand: "Samsung", model: "Galaxy S23", price: 899, os: "Android" },
    { id: 3, brand: "Xiaomi", model: "Mi 13", price: 499, os: "Android" },
  ]);
});
