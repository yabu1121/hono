import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import posts from '../../../routers/posts'
import auth from '../../../auth/auth'
import ai from '../../../routers/ai'
import pokemon from '../../../routers/pokemon'

// export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.use('*', prettyJSON())

app.route('/posts', posts)
app.route('/auth', auth)
app.route('/generate', ai)
app.route('/pokemon', pokemon)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
