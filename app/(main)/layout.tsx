import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

export default function Layout(props: LayoutProps<"/">) {
  return (
    <div>
      <Suspense>
        <Navbar />
      </Suspense>
      {props.children}
      <Footer />
    </div>
  );
}
