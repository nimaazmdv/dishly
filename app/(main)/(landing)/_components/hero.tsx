import Image from "next/image";
import Link from "next/link";

import { Suspense } from "react";
import { Container } from "@/app/_components/app-ui/container";
import { Button } from "@/app/_components/ui/button";
import { Spinner } from "@/app/_components/ui/spinner";
import { UserIcon } from "lucide-react";

import { headers } from "next/headers";
import { auth } from "@/app/_lib/auth";

export function Hero() {
  return (
    <div>
      <Container>
        <div className="bg-secondary text-secondary-foreground grid min-h-[80svh] items-center gap-4 rounded-lg p-8 md:grid-cols-2">
          <div className="space-y-4 text-center md:text-start">
            <h1 className="text-3xl font-bold md:text-4xl">
              Explore and share <span className="text-brand">fun recipes</span>{" "}
              to unlock your inner chef
            </h1>
            <p>
              Explore from +100 delicious recipes from us or our community, or
              join us to share your own experience
            </p>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Button className="rounded-full" asChild>
                <Link href="/recipes">Explore recipes</Link>
              </Button>
              <Suspense fallback={<Spinner />}>
                <SuspendedSigninButton />
              </Suspense>
            </div>
          </div>
          <div className="relative h-80 md:h-full">
            <Image
              src="/images/dish.png"
              alt="dish"
              className="object-contain md:object-right"
              fill
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export async function SuspendedSigninButton() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    !session && (
      <Button variant="ghost" className="rounded-full" asChild>
        <Link href="/auth">
          <UserIcon />
          Sign in
        </Link>
      </Button>
    )
  );
}
