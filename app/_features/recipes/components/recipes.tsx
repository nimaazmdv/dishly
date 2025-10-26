import Link from "next/link";

import { ResponsiveGrid } from "@/app/_components/app-ui/responsive-grid";
import { AppOrderSelect } from "@/app/_components/app-ui/app-order-select";
import { AppPagination } from "@/app/_components/app-ui/app-pagination";
import { Button } from "@/app/_components/ui/button";
import { RecipeItem } from "./ui/recipe-item";
import { RecipesEmpty } from "./ui/recipe-empty";

import { headers } from "next/headers";
import { auth } from "@/app/_lib/auth";
import { getRecipes } from "../lib/data";

import type { Recipe } from "@/app/_lib/drizzle/schema";

interface RecipesProps {
  page?: number;
  query?: string;
  order?: "latest" | "popular";
  filters?: Partial<Recipe>;
  withAuthor?: boolean;
}

export async function Recipes({ withAuthor, ...options }: RecipesProps) {
  const { recipes, total } = await getRecipes(options);

  const session = await auth.api.getSession({ headers: await headers() });

  // Guide user to create a new recipe if they are signed in, and in the recipes page or their own profile
  const authorId = options.filters?.authorId;
  const showCreate = !!session && (!authorId || authorId === session.user.id);

  if (!total) {
    return (
      <RecipesEmpty
        desc={
          !authorId
            ? "There is no recipes with the provided criteria"
            : authorId === session?.user.id
              ? "You don't have any recipes yet"
              : "This user doesn't have any recipes yet"
        }
        showCreate={showCreate}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <AppOrderSelect />
        {showCreate && (
          <Button asChild>
            <Link href="/recipes/create">Create recipe</Link>
          </Button>
        )}
      </div>

      <ResponsiveGrid>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} withAuthor={withAuthor} />
        ))}
      </ResponsiveGrid>

      <AppPagination totalPages={total} />
    </div>
  );
}
