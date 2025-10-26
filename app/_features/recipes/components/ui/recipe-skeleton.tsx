import { ResponsiveGrid } from "@/app/_components/app-ui/responsive-grid";
import { RecipeItemSkeleton } from "./recipe-item-skeleton";

export function RecipesSkeleton({ length }: { length: number }) {
  return (
    <ResponsiveGrid>
      {Array.from({ length }).map((_, index) => (
        <RecipeItemSkeleton key={index} />
      ))}
    </ResponsiveGrid>
  );
}
