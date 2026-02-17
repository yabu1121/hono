import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql', // mysql, sqlite, tursoなど
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
