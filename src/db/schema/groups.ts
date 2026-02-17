import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const groupsTable = pgTable('groups', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text().notNull(),
	description: text(),
});
