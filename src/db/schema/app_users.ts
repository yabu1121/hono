import { type AnyPgColumn, integer, pgTable, text } from 'drizzle-orm/pg-core';

export const app_usersTable = pgTable('app_users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text().notNull(),
	invitedBy: integer('invited_by').references((): AnyPgColumn => app_usersTable.id),
});
