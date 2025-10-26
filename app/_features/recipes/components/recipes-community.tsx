import Link from "next/link";

import { Container } from "@/app/_components/app-ui/container";
import { IconBadge } from "@/app/_components/app-ui/icon-badge";
import { Button } from "@/app/_components/ui/button";
import { ResponsiveGrid } from "@/app/_components/app-ui/responsive-grid";
import { RecipeItem } from "./ui/recipe-item";
import { UsersRoundIcon } from "lucide-react";

import { getTopRecipes } from "../lib/data";

export function RecipesCommunity() {
  return (
    <div className="py-10">
      <Container>
        <div className="grid gap-4">
          <div className="grid gap-2 text-center">
            <IconBadge className="mx-auto">
              <UsersRoundIcon />
            </IconBadge>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Recipes from our community
            </h2>
            <p>Delicious and fun recipes you can try from our community</p>
            <Button variant="link" className="justify-self-center" asChild>
              <Link href="/recipes">See more</Link>
            </Button>
          </div>

          <TopCommunityRecipes />

          <Button variant="outline" size="lg" className="md:hidden" asChild>
            <Link href="/recipes">See more</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export async function TopCommunityRecipes() {
  const topRecipes = await getTopRecipes({ isOfficial: false });

  return (
    <ResponsiveGrid>
      {topRecipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} withAuthor />
      ))}
    </ResponsiveGrid>
  );
}
