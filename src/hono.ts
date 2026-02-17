import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { basicAuth } from 'hono/basic-auth'
import posts from './routers/posts'
import auth from './auth/auth'
import ai from './routers/ai'
import pokemon from './routers/pokemon'

// Hono() でインスタンス化をする
const app = new Hono()

app.use("*", prettyJSON())
app.use(
  "/auth/*",
  basicAuth({
    username: process.env.BASIC_AUTH_USERNAME!, 
    password: process.env.BASIC_AUTH_PASSWORD!
  })
);

app.route('/posts', posts)
app.route('/auth', auth)
app.route('/generate', ai)
app.route('/pokemon', pokemon)

export default app
