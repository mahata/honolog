import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from 'hono';
import { article } from "../../../drizzle/schema";
import { createArticleSchema, getArticleSchema } from "../../../types/article";

const articlesRouter = new Hono();

articlesRouter.get("/", async (c) => {
  const db = drizzle(c.env.DB);
  const allArticles = await db.select().from(article).all();

  return c.json(allArticles, 200);
});

articlesRouter.post("/", zValidator("json", createArticleSchema), async (c) => {
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

articlesRouter.get("/:id", zValidator("param", getArticleSchema), async (c) => {
  const db = drizzle(c.env.DB);
  const id = c.req.valid("param").id;
  const oneArticle = await db.select().from(article).where(eq(article.id, id)).get();

  if (!oneArticle) {
    return c.text("Not Found", 404);
  }

  return c.json(oneArticle, 200)
});

export default articlesRouter;
