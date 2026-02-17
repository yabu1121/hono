import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { app_usersTable } from "./app_users";
import { app_postsTable } from "./app_posts";

export const app_commentsTable = pgTable('app_comments', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	content: text().notNull(),
	creator: integer().references(() => app_usersTable.id),
	postId: integer('post_id').references(() => app_postsTable.id),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
