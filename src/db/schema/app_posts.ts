import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { app_usersTable } from "./app_users";

export const app_postsTable = pgTable('app_posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  content: text().notNull(),
  authorId: integer('author_id').references(() => app_usersTable.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
