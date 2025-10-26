import { db } from "../db";
import { users, recipes, ingredients, steps, likes } from "../schema";

import usersData from "./data/users.json";
import recipesData from "./data/recipes.json";
import likesData from "./data/likes.json";

async function seed() {
  // Seed users
  await db.transaction(async (tx) => {
    await tx.insert(users).values(
      usersData.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: true,
        image: user.image,
      })),
    );

    // Seed recipes with ingredients and steps
    for (const recipe of recipesData) {
      const [{ id: recipeId }] = await tx
        .insert(recipes)
        .values({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          servings: recipe.servings,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          difficulty: recipe.difficulty as any,
          isOfficial: recipe.isOfficial,
          authorId: recipe.authorId,
        })
        .returning();

      await tx.insert(ingredients).values(
        recipe.ingredients.map((ing) => ({
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          recipeId,
        })),
      );

      await tx.insert(steps).values(
        recipe.steps.map((step, index) => ({
          number: index + 1,
          instruction: step,
          recipeId,
        })),
      );
    }

    // Seed likes
    await tx.insert(likes).values(
      likesData.map((like) => ({
        recipeId: like.recipeId,
        userId: like.userId,
      })),
    );
  });

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
