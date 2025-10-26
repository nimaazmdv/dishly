import { Skeleton } from "@/app/_components/ui/skeleton";

export function RecipeItemSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-md p-4 shadow-md">
      <Skeleton className="h-80 w-full rounded-lg" />

      <div className="flex flex-1 flex-col gap-1">
        <Skeleton className="h-2 w-40" />
      </div>
    </div>
  );
}
