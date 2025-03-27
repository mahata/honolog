import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from 'hono';
import { article } from "../drizzle/schema";
import { createArticleSchema, getArticleSchema } from "../types/article";
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
});

app.get("/api/v1/articles/:id", zValidator("param", getArticleSchema), async (c) => {
  const db = drizzle(c.env.DB);
  const id = c.req.valid("param").id;
  const oneArticle = await db.select().from(article).where(eq(article.id, id)).get();

  if (!oneArticle) {
    return c.text("Not Found", 404);
  }

  return c.json(oneArticle, 200)
})

export default app;
