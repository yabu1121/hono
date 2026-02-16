import { Hono } from "hono";

const auth = new Hono();

auth.get('/page', (c) => {
  return c.text("you are authorized");
})

export default auth