import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { article } from "../drizzle/schema";

const insertArticleSchema = createInsertSchema(article, {
  id: z.string().uuid(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 256 chars"),
  content: z.string().min(1, "Article is required"),
});

export const createArticleSchema = insertArticleSchema.pick({
  title: true,
  content: true,
})

export const updateArticleSchema = insertArticleSchema.pick({
  title: true,
  content: true,
});

export const getArticleSchema = insertArticleSchema.pick({ id: true });
