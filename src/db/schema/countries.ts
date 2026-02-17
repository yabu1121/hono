import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const countriesTable = pgTable('country', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
})

