"use client";

import Link from "next/link";
import { Container } from "@/app/_components/app-ui/container";
import { Logo } from "@/app/_components/app-ui/logo";
import { Button } from "@/app/_components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Spinner } from "@/app/_components/ui/spinner";
import { MenuIcon, UserIcon } from "lucide-react";

import { usePathname } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { cn } from "@/app/_lib/utils";
import { items } from "../_lib/nav-items";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  return (
    <header className="py-4">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  pathname === item.path && "relative font-semibold",
                )}
              >
                {pathname === item.path && (
                  <div className="bg-brand absolute -bottom-0.5 h-0.5 w-2/3 rounded-full"></div>
                )}
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isPending ? (
              <Spinner />
            ) : session ? (
              <Link href="/profile" className="hidden md:block">
                <Avatar>
                  <AvatarImage src={session.user.image!} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {session.user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button className="rounded-full" asChild>
                <Link href="/auth">
                  <UserIcon />
                  Sign in
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon-sm" className="md:hidden">
              <MenuIcon className="size-4.5" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
