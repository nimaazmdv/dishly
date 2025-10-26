import Link from "next/link";
import { Container } from "@/app/_components/app-ui/container";
import { Logo } from "@/app/_components/app-ui/logo";

import { items } from "../_lib/nav-items";

export function Footer() {
  return (
    <footer className="foods-pattern py-8">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <Link href="/">
            <Logo />
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            {items.map((item) => (
              <Link key={item.path} href={item.path}>
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
