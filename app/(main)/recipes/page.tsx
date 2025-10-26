import { Suspense } from "react";
import { Container } from "@/app/_components/app-ui/container";
import { AppSearch } from "@/app/_components/app-ui/app-search";
import { Recipes, RecipesSkeleton } from "@/app/_features/recipes";

import { searchSchema } from "../_lib/search-schema";

export default async function Page(props: PageProps<"/recipes">) {
  const searchParams = await props.searchParams;

  const { page, query, order } = searchSchema.parse(searchParams);

  return (
    <div className="py-10">
      <div className="py-12">
        <Container>
          <div className="grid justify-center gap-4 text-center">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold md:text-4xl">
                Discover fun and delicious recipes
              </h1>
              <p>
                Explore and try hundreds of recipes that we and our community
                post everyday
              </p>
            </div>
            <AppSearch
              placeholder="Seach recipes ..."
              className="mx-auto rounded-full"
            />
          </div>
        </Container>
      </div>

      <div>
        <Container>
          <Suspense
            key={`key-${query}-${order}`}
            fallback={<RecipesSkeleton length={12} />}
          >
            <Recipes page={page} query={query} order={order} withAuthor />
          </Suspense>
        </Container>
      </div>
    </div>
  );
}
