import { Hero } from "./_components/hero";
import { RecipesOfficial, RecipesCommunity } from "@/app/_features/recipes";

export default function Page() {
  return (
    <div>
      <Hero />
      <RecipesOfficial />
      <RecipesCommunity />
    </div>
  );
}
