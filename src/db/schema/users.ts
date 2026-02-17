import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { rolesEnum } from "./enums";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: rolesEnum().default("guests"),
  ...timestamps
});

