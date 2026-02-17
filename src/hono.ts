import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { basicAuth } from 'hono/basic-auth'
import posts from './router/posts/posts'
import auth from './auth/auth'

// Hono() でインスタンス化をする
const app = new Hono()

app.use("*", prettyJSON())
app.use(
  "/auth/*",
  basicAuth({username: process.env.BASIC_AUTH_USERNAME!, password: process.env.BASIC_AUTH_PASSWORD!})
);

app.route('/posts', posts)
app.route('/auth', auth)

export default app
