import { Suspense } from "react";
import { Container } from "@/app/_components/app-ui/container";
import { ProfileBanner, getStats } from "@/app/_features/profile";
import { Recipes, RecipesSkeleton } from "@/app/_features/recipes";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/auth";
import { searchSchema } from "../_lib/search-schema";

export default async function Page(props: PageProps<"/recipes">) {
  const searchParams = await props.searchParams;
  const { page, query, order } = searchSchema.parse(searchParams);

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth");
  const stats = await getStats(session.user.id);

  return (
    <div>
      <Container>
        <ProfileBanner user={session.user} stats={stats} />
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
              filters={{ authorId: session.user.id }}
            />
          </Suspense>
        </Container>
      </div>
    </div>
  );
}
