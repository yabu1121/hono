import { relations } from "drizzle-orm"
import { postsTable } from "../schema/posts"
import { usersTable } from "../schema/users"
import { app_commentsTable } from "../schema/app_comments";
import { app_usersTable } from "../schema/app_users";
import { commentLikesTable } from "../schema/commentLike";

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