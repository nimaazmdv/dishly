import { headers } from "next/headers";
import { cacheLife, cacheTag } from "next/cache";

import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/drizzle/db";
import { likes, Recipe, recipes, users } from "@/app/_lib/drizzle/schema";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";

interface GetTopRecipesOptions {
  isOfficial?: boolean;
  limit?: number;
}

export async function getTopRecipes({
  isOfficial = true,
  limit = 4,
}: GetTopRecipesOptions = {}) {
  "use cache";
  cacheLife("hours");
  cacheTag("top-recipes");

  return await db
    .select({
      ...getTableColumns(recipes),
      author: {
        id: users.id,
        name: users.name,
      },
      likesCount: count(likes.recipeId),
    })
    .from(recipes)
    .where(eq(recipes.isOfficial, isOfficial))
    .innerJoin(users, eq(recipes.authorId, users.id))
    .leftJoin(likes, eq(likes.recipeId, recipes.id))
    .groupBy(recipes.id, users.id)
    .orderBy(desc(count(likes.recipeId)))
    .limit(limit);
}

interface GetRecipesOptions {
  query?: string;
  page?: number;
  order?: "latest" | "popular";
  filters?: Partial<Recipe>;
}

const LIMIT = 12;
export async function getRecipes({
  query,
  page = 1,
  order = "latest",
  filters = {},
}: GetRecipesOptions = {}) {
  const offset = (page - 1) * LIMIT;
  const conditions = [];

  if (query) {
    conditions.push(ilike(recipes.title, `%${query}%`));
  }

  for (const [field, value] of Object.entries(filters)) {
    conditions.push(eq(recipes[field as keyof Partial<Recipe>], value as any));
  }

  const data = await db
    .select({
      ...getTableColumns(recipes),
      author: {
        id: users.id,
        name: users.name,
      },
      likesCount: count(likes.recipeId),
    })
    .from(recipes)
    .where(and(...conditions))
    .innerJoin(users, eq(recipes.authorId, users.id))
    .leftJoin(likes, eq(likes.recipeId, recipes.id))
    .groupBy(recipes.id, users.id)
    .orderBy(
      desc(order === "latest" ? recipes.createdAt : count(likes.recipeId)),
    )
    .limit(LIMIT)
    .offset(offset);

  const recipesCount = await db.$count(recipes, and(...conditions));

  return { recipes: data, total: Math.ceil(recipesCount / LIMIT) };
}

export async function getRecipe(id: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`recipe-${id}`);

  return await db.query.recipes.findFirst({
    where: eq(recipes.id, id),
    with: {
      author: { columns: { id: true, name: true } },
      ingredients: true,
      steps: true,
    },
  });
}

export async function getRecipeLikes(id: string) {
  const count = await db.$count(likes, eq(likes.recipeId, id));

  let currentUserLike = null;
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    currentUserLike = await db.query.likes.findFirst({
      where: and(eq(likes.recipeId, id), eq(likes.userId, session.user.id)),
    });
  }

  return { count, isLiked: !!currentUserLike };
}
