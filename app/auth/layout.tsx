import Link from "next/link";
import Image from "next/image";

import { Container } from "@/app/_components/app-ui/container";
import { Logo } from "@/app/_components/app-ui/logo";

export default function Layout(props: LayoutProps<"/auth">) {
  return (
    <div className="grid h-svh md:grid-cols-2">
      <div className="flex flex-col">
        <header className="py-5">
          <Container className="md:max-w-150">
            <Link href="/">
              <Logo />
            </Link>
          </Container>
        </header>

        <div className="flex-1">{props.children}</div>
      </div>

      <div className="relative hidden md:block">
        <Image
          src="/images/foods.jpg"
          alt="Foods background"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
}
