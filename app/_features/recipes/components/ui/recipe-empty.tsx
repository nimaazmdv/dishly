import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import { ChefHatIcon } from "lucide-react";

interface RecipesEmptyProps {
  desc: string;
  showCreate?: boolean;
}

export function RecipesEmpty({ desc, showCreate = false }: RecipesEmptyProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ChefHatIcon />
        </EmptyMedia>
        <EmptyTitle>No recipes was found</EmptyTitle>
        <EmptyDescription>{desc}</EmptyDescription>
      </EmptyHeader>
      {showCreate && (
        <EmptyContent>
          <Button asChild>
            <Link href="/recipes/create">Create recipe</Link>
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
