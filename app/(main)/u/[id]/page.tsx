import { Suspense } from "react";
import { Container } from "@/app/_components/app-ui/container";
import { ProfileBanner, getUser, getStats } from "@/app/_features/profile";
import { Recipes, RecipesSkeleton } from "@/app/_features/recipes";

import { notFound } from "next/navigation";
import { searchSchema } from "../../_lib/search-schema";

export default async function Page(props: PageProps<"/recipes/[id]">) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const { page, query, order } = searchSchema.parse(searchParams);

  const user = await getUser(id);
  const stats = await getStats(id);

  if (!user) notFound();

  return (
    <div>
      <Container>
        <ProfileBanner user={user} stats={stats} />
      </Container>

      <div className="py-8">
        <Container>
          <Suspense
            key={`key-${query}-${order}`}
            fallback={<RecipesSkeleton length={4} />}
          >
            <Recipes
              page={page}
              query={query}
              order={order}
              filters={{ authorId: user.id }}
            />
          </Suspense>
        </Container>
      </div>
    </div>
  );
}
