import { Hono } from "hono";
import { db } from "../../db/client";
import { posts as postTable } from "../../db/schema/posts"
import { eq } from "drizzle-orm";

const app = new Hono();

// postを全件取得
app.get('/', async (c) => {
  const allPosts = await db.select().from(postTable);
  return c.json({posts: allPosts})
})

// post を id で取得
app.get('/:id', async (c) => {
  const id = c.req.param("id");
  const post = await db.select()
    .from(postTable)
    .where(eq(postTable.id, Number(id)))
  return post 
    ? c.json(post) 
    : c.json({message: "not found this page"})
})

export default app