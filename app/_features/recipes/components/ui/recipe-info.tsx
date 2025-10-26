import Image from "next/image";
import { IconBadge } from "@/app/_components/app-ui/icon-badge";
import { ChefHatIcon, ClockIcon, SignalHighIcon, UserIcon } from "lucide-react";
import { ChefHatFilledIcon } from "../icons/chef-hat-filled-icon";

import type { Recipe } from "@/app/_lib/drizzle/schema";

interface RecipeInfoProps {
  recipe: Recipe;
}

export function RecipeInfo({ recipe }: RecipeInfoProps) {
  return (
    <div className="@container space-y-4">
      <div className="bg-secondary relative grid h-100 place-content-center overflow-hidden rounded-2xl">
        {recipe.image ? (
          <Image src={recipe.image} alt="" fill className="object-cover" />
        ) : (
          <ChefHatFilledIcon className="text-primary/50 size-18" />
        )}
      </div>

      <div className="grid grid-cols-2 items-center justify-between gap-4 @min-[520px]:grid-cols-4">
        <div className="flex items-center gap-2">
          <IconBadge>
            <ClockIcon />
          </IconBadge>
          <div>
            <div className="text-muted-foreground text-sm">Prep time</div>
            <div>{recipe.prepTime} mins</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconBadge>
            <ChefHatIcon />
          </IconBadge>
          <div>
            <div className="text-muted-foreground text-sm">Cook time</div>
            <div>{recipe.cookTime} mins</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconBadge>
            <UserIcon />
          </IconBadge>
          <div>
            <div className="text-muted-foreground text-sm">Servings</div>
            <div>{recipe.servings} persons</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconBadge>
            <SignalHighIcon />
          </IconBadge>
          <div>
            <div className="text-muted-foreground text-sm">Difficulty</div>
            <div>{recipe.difficulty}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
