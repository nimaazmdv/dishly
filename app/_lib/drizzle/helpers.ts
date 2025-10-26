import { timestamp, uuid } from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const id = uuid().defaultRandom().primaryKey();
