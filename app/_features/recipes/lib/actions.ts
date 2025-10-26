"use server";

import { join } from "path";
import { writeFile } from "fs/promises";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { treeifyError } from "zod";
import { recipeSchema } from "./schema";

import { auth } from "@/app/_lib/auth";
import { db } from "@/app/_lib/drizzle/db";
import { ingredients, likes, recipes, steps } from "@/app/_lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function toggleLike(recipeId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      success: false,
      error: "Please sign in to your account to be able to like a recipe",
    };
  }

  const likeCond = and(
    eq(likes.recipeId, recipeId),
    eq(likes.userId, session.user.id),
  );

  const existing = await db.query.likes.findFirst({
    where: likeCond,
  });

  if (existing) {
    await db.delete(likes).where(likeCond);
  } else {
    await db.insert(likes).values({ recipeId, userId: session.user.id });
  }

  revalidateTag("recipes-top", "max");
  return { success: true, action: existing ? "unlike" : "like" };
}

export async function createRecipe(prevState: any, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      success: false,
      error: "Please sign in to your account to be able to like a recipe",
    };
  }

  const data = {
    ...Object.fromEntries(formData),
    image: formData.get("image") as File,
    ingredients: [] as any[],
    instructions: formData.getAll("instructions"),
  };

  console.log(data.image);

  let i = 0;
  while (formData.has(`ingredients[${i}].name`)) {
    data.ingredients.push({
      quantity: formData.get(`ingredients[${i}].quantity`),
      unit: formData.get(`ingredients[${i}].unit`),
      name: formData.get(`ingredients[${i}].name`),
    });
    i++;
  }

  const result = recipeSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: treeifyError(result.error) };
  }

  if (data.image.size) {
    const imageBuffer = Buffer.from(await data.image.arrayBuffer());
    const imagePath = join(
      process.cwd(),
      "public/images/recipes",
      data.image.name,
    );

    await writeFile(imagePath, imageBuffer);
  }

  await db.transaction(async (tx) => {
    const [{ id: recipeId }] = await tx
      .insert(recipes)
      .values({
        title: result.data.title,
        image: data.image.size
          ? `/images/recipes/${data.image.name}`
          : undefined,
        prepTime: result.data.prepTime,
        cookTime: result.data.cookTime,
        servings: result.data.servings,
        difficulty: result.data.difficulty,
        isOfficial: false,
        authorId: session.user.id,
      })
      .returning();

    await tx.insert(ingredients).values(
      result.data.ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        recipeId,
      })),
    );

    await tx.insert(steps).values(
      result.data.instructions.map((instruction, index) => ({
        number: index + 1,
        instruction,
        recipeId,
      })),
    );
  });

  redirect("/recipes");
}
