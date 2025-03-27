import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const article = sqliteTable("article", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  content: text("text").default(""),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});
