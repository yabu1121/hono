import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { app_usersTable } from "./app_users";
import { groupsTable } from "./groups";

export const app_usersToGroupsTable = pgTable('app_users_to_groups', {
	app_userId: integer('app_user_id').notNull().references(() => app_usersTable.id),
	groupId: integer('group_id').notNull().references(() => groupsTable.id),
}, (t) => [
	primaryKey(t.app_userId, t.groupId)
]);
