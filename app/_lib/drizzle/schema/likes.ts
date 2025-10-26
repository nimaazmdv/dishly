import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { timestamps } from "../helpers";
import { users } from "./auth-schema";
import { recipes } from "./recipes";

export const likes = pgTable(
  "likes",
  {
    userId: t
      .uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    recipeId: t
      .uuid()
      .references(() => recipes.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (table) => [t.primaryKey({ columns: [table.userId, table.recipeId] })],
);

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),

  recipe: one(recipes, {
    fields: [likes.recipeId],
    references: [recipes.id],
  }),
}));

export type Like = typeof likes.$inferSelect;
export type LikeInsert = typeof likes.$inferInsert;
