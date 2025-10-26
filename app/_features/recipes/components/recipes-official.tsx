import Link from "next/link";

import { Container } from "@/app/_components/app-ui/container";
import { IconBadge } from "@/app/_components/app-ui/icon-badge";
import { Button } from "@/app/_components/ui/button";
import { ResponsiveGrid } from "@/app/_components/app-ui/responsive-grid";
import { RecipeItem } from "./ui/recipe-item";
import { StarIcon } from "lucide-react";

import { getTopRecipes } from "../lib/data";

export function RecipesOfficial() {
  return (
    <div className="py-10">
      <Container>
        <div className="grid gap-4">
          <div className="grid gap-2 text-center">
            <IconBadge className="mx-auto">
              <StarIcon />
            </IconBadge>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Our popular recipes
            </h2>
            <p>
              Hero are some of our popular recipes that we recommend you to try
            </p>
            <Button
              variant="link"
              className="hidden justify-self-center md:block"
              asChild
            >
              <Link href="/recipes">See more</Link>
            </Button>
          </div>

          <TopOfficialRecipes />

          <Button variant="outline" size="lg" className="md:hidden" asChild>
            <Link href="/recipes">See more</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export async function TopOfficialRecipes() {
  const topRecipes = await getTopRecipes({ isOfficial: true });

  return (
    <ResponsiveGrid>
      {topRecipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </ResponsiveGrid>
  );
}
