import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { countriesTable } from "./countries";

export const citiesTable = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),

  countryId: integer('country_id').references(() => countriesTable.id),
})
