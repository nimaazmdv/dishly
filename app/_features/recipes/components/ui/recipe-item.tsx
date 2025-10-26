import Image from "next/image";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { ClockIcon, SignalHighIcon, UserIcon } from "lucide-react";
import { ChefHatFilledIcon } from "../icons/chef-hat-filled-icon";
import { HeartFilledIcon } from "../icons/heart-filled-icon";

import type { Recipe, User } from "@/app/_lib/drizzle/schema";

interface RecipeItemProps {
  recipe: Recipe & { likesCount: number; author: Pick<User, "id" | "name"> };
  withAuthor?: boolean;
}

export function RecipeItem({ recipe, withAuthor = false }: RecipeItemProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md p-4 shadow-md">
      <div className="bg-secondary relative grid h-80 w-full place-content-center overflow-hidden rounded-lg">
        {recipe.image ? (
          <Image src={recipe.image} alt="" fill className="object-cover" />
        ) : (
          <ChefHatFilledIcon className="text-primary/50 size-14" />
        )}

        <div className="bg-background text-foreground absolute top-4 right-4 z-10 flex items-center gap-1 rounded-full px-2 py-1 text-sm">
          <HeartFilledIcon />
          {recipe.likesCount}
        </div>

        <div className="bg-brand/75 text-brand-foreground absolute bottom-0 left-0 z-10 flex w-full justify-between gap-2 p-3 px-8 text-sm font-medium">
          <div className="flex items-center gap-1">
            <ClockIcon className="size-4" />
            {recipe.prepTime + recipe.cookTime} mins
          </div>

          <div className="flex items-center gap-1">
            <SignalHighIcon className="size-4" />
            {recipe.difficulty}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <h3 className="flex-1 text-xl font-medium">{recipe.title}</h3>
        {withAuthor && (
          <Button variant="link" className="self-start has-[>svg]:px-0" asChild>
            <Link
              href={`/u/${recipe.authorId}`}
              className="text-muted-foreground flex items-center gap-1"
            >
              <UserIcon className="size-4" />
              <span>{recipe.author.name}</span>
            </Link>
          </Button>
        )}
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link href={`/recipes/${recipe.id}`}>See receipe details</Link>
      </Button>
    </div>
  );
}
