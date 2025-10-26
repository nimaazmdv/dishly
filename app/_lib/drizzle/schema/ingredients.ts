import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

import { id, timestamps } from "../helpers";
import { recipes } from "./recipes";

export const ingredients = pgTable("ingredients", {
  id,
  name: t.text().notNull(),
  quantity: t.real(),
  unit: t.text(),
  ...timestamps,

  recipeId: t
    .uuid()
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
});

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));

export type Ingredient = typeof ingredients.$inferSelect;
export type IngredientInsert = typeof ingredients.$inferInsert;
