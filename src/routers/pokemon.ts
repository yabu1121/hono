import { Hono } from "hono";
import { getRandomPokemon } from "../lib/pokemon";

const app = new Hono()

app.get('/random', async (c) => {
  try {
    const res = await getRandomPokemon()
    return c.json(res)
  } catch (e) {
    console.error(e)
    return c.json({error: "failed to fetch pokemon"})
  }
})

export default app

