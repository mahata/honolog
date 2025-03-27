import { drizzle } from "drizzle-orm/d1";
import { Hono } from 'hono';
import { article } from "../drizzle/schema";
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

export default app;
