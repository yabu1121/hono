import { relations } from "drizzle-orm"
import { postsTable, usersTable } from "../schema"

export const usersRelation = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [postsTable.ownerId],
    references: [usersTable.id],
  })
}))