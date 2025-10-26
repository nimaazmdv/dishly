import { db } from "@/app/_lib/drizzle/db";
import { likes, recipes, users } from "@/app/_lib/drizzle/schema";
import { count, eq } from "drizzle-orm";

export async function getUser(id: string) {
  return await db.query.users.findFirst({ where: eq(users.id, id) });
}

export async function getStats(userId: string) {
  const recipesCount = await db.$count(recipes, eq(recipes.authorId, userId));

  const [{ totalLikesCount }] = await db
    .select({ totalLikesCount: count() })
    .from(likes)
    .innerJoin(recipes, eq(likes.recipeId, recipes.id))
    .where(eq(recipes.authorId, userId));

  return { recipesCount, totalLikesCount };
}
