import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from 'hono';
import { article } from "../drizzle/schema";
import { createArticleSchema } from "../types/article";
import { renderer } from './renderer';

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>);
})

app.get("/api/v1/articles", async (c) => {
  const db = drizzle(c.env.DB);
  const allArticles = await db.select().from(article).all();

  return c.json(allArticles, 200);
})

app.post("/api/v1/articles", zValidator("json", createArticleSchema), async (c) => {
  const { title, content } = await c.req.valid("json");
  const db = drizzle(c.env.DB);
  const id = crypto.randomUUID();
  const newArticle = await db
    .insert(article)
    .values({ id, title, content })
    .returning()
    .get()

  return c.json(newArticle, 201);
})

export default app;
