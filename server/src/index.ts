import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/hono", (c) => {
  return c.json({ message: "Hello Hono!" });
});

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
