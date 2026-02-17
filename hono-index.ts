import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import posts from './router/posts/posts'
import auth from './auth/auth'
import { basicAuth } from 'hono/basic-auth'

// Hono() でインスタンス化をする
const app = new Hono()

app.use("*", prettyJSON())
app.use(
  "/auth/*",
  basicAuth({username: "testUser", password: "password"})
);


app.route('/posts', posts)
app.route('/auth', auth)

export default app
