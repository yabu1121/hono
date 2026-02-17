import { relations } from "drizzle-orm"
import { postsTable } from "../schema/posts"
import { usersTable } from "../schema/users"
import { app_commentsTable, app_usersTable, commentLikesTable } from "../schema";

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [postsTable.ownerId],
    references: [usersTable.id],
  })
}))

//　TODO その他も実装しよう