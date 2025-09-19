import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/hono", (c) => {
  return c.json({ message: "Hello Hono!" });
});

const port = Number(process.env.PORT) || 3001;

serve(
  {
    fetch: app.fetch,
    port: port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
