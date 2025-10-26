import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { RecipeInfo } from "./ui/recipe-info";
import { RecipeIngredients } from "./ui/recipe-ingredients";
import { RecipeSteps } from "./ui/recipe-steps";
import { LikeButton } from "./like-button";
import { UserIcon } from "lucide-react";

import { notFound } from "next/navigation";
import { getRecipe, getRecipeLikes } from "../lib/data";
import { Suspense } from "react";

interface RecipeDetailsProps {
  idPromise: Promise<string>;
}

export async function RecipeDetails({ idPromise }: RecipeDetailsProps) {
  const id = await idPromise;

  const recipe = await getRecipe(id);
  if (!recipe) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 min-[850px]:flex-row-reverse min-[850px]:items-center">
        <div className="min-[850px]:basis-2/3">
          <RecipeInfo recipe={recipe} />
        </div>
        <div className="space-y-4 min-[850px]:basis-1/3">
          <div>
            <p className="text-muted-foreground">Let's cook</p>
            <h1 className="text-2xl font-semibold min-[850px]:text-3xl">
              {recipe.title}
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="link" size="sm" className="has-[>svg]:px-0">
              <UserIcon className="size-4" />
              <Link href={`/u/${recipe.authorId}`}>{recipe.author.name}</Link>
            </Button>

            <Suspense>
              <LikeButton
                id={recipe.id}
                likeStatusPromise={getRecipeLikes(id)}
              />
            </Suspense>
          </div>

          <RecipeIngredients ingredients={recipe.ingredients} />
        </div>
      </div>

      <RecipeSteps steps={recipe.steps} />
    </div>
  );
}
