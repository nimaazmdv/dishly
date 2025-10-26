import { relations } from "drizzle-orm";
import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { id, timestamps } from "../helpers";
import { users } from "./auth-schema";
import { ingredients } from "./ingredients";
import { steps } from "./steps";
import { likes } from "./likes";

export const difficultyEnum = pgEnum("difficulty", ["easy", "intermediate", "difficult"]);

export const recipes = pgTable("recipes", {
  id,
  title: t.text().notNull(),
  image: t.text(),
  prepTime: t.integer().notNull(),
  cookTime: t.integer().notNull(),
  servings: t.integer().notNull(),
  difficulty: difficultyEnum().notNull(),
  isOfficial: t.boolean().default(false).notNull(),
  ...timestamps,

  authorId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  author: one(users, {
    fields: [recipes.authorId],
    references: [users.id],
  }),

  ingredients: many(ingredients),
  steps: many(steps),
  likes: many(likes),
}));

export type Recipe = typeof recipes.$inferSelect;
export type RecipeInsert = typeof recipes.$inferInsert;
