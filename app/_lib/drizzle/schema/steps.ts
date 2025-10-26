import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { id, timestamps } from "../helpers";
import { recipes } from "./recipes";

export const steps = pgTable("steps", {
  id,
  number: t.integer().notNull(),
  instruction: t.text().notNull(),
  ...timestamps,

  recipeId: t
    .uuid()
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
});

export const stepsRelations = relations(steps, ({ one }) => ({
  recipe: one(recipes, {
    fields: [steps.recipeId],
    references: [recipes.id],
  }),
}));

export type Step = typeof steps.$inferSelect;
export type StepInsert = typeof steps.$inferInsert;
