import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import posts from './router/posts/posts'

// Hono() でインスタンス化をする
const app = new Hono()

app.use("*", prettyJSON())
app.route('/posts', posts)

app.get('/')

export default app
