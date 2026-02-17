import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { app_usersTable } from "./app_users";
import { app_commentsTable } from "./app_comments";

export const commentLikesTable = pgTable('comment_likes', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	creator: integer().references(() => app_usersTable.id),
	commentId: integer('comment_id').references(() => app_commentsTable.id),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});