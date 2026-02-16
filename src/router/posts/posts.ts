import { Hono } from "hono";

let BlogPosts = [
  {
    id: "1",
    title: "blog1",
    content: "content1",
  },
  {
    id: "2",
    title: "blog2",
    content: "content2",
  },
  {
    id: "3",
    title: "blog3",
    content: "content3",
  },
]

const posts = new Hono();

posts.get('/:id', (c) => {
  const id = c.req.param("id");
  const post = BlogPosts.find((p) => p.id == id)  
  return post ? c.json(post) : c.json({message: "not found this page"})
})


posts.get('/', (c) => {
  return c.json({
    posts: BlogPosts    
  });
})


posts.post('/', async (c) => {
  const {title, content} = await c.req.json<{title: string; content: string;}>()
  const newPost = {id: String(BlogPosts.length + 1), title, content}
  BlogPosts = [...BlogPosts, newPost];
  return c.json(newPost, 201)
})

posts.put('/:id', async (c) => {
  const id = c.req.param("id")
  const index = BlogPosts.findIndex((p) => p.id == id);
  if (index == -1 ) return c.json({message: "post is not found"},404)
  const {title, content} = await c.req.json<{title: string; content:string}>()
  BlogPosts[index] = {...BlogPosts[index], title, content}

  return c.json(BlogPosts[index])
})


posts.delete('/:id', async (c) => {
  const id = c.req.param("id")
  const index = BlogPosts.findIndex((p) => p.id == id);
  if (index == -1 ) return c.json({message: "post is not found"},404)
  BlogPosts = BlogPosts.filter((p) => p.id !== id)
  return c.json({message : "delete"})
})

export default posts