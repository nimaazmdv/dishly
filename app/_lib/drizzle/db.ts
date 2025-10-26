import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// Load env files manually for seeding the database
loadEnvConfig(process.cwd());

export const db = drizzle(process.env.DATABASE_URL!, {
  casing: "snake_case",
  schema,
});
