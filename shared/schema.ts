import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  images: text("images").array(),
});

export const insertMemorySchema = createInsertSchema(memories).omit({ id: true });

export type Memory = typeof memories.$inferSelect & { images: string[] };
export type InsertMemory = z.infer<typeof insertMemorySchema> & { images?: string[] };
