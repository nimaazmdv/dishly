import { Container } from "@/app/_components/app-ui/container";
import { RecipeForm } from "@/app/_features/recipes";

export default function Page() {
  return (
    <div>
      <Container className="max-w-160">
        <div className="foods-pattern selection:bg-brand selection:text-brand-foreground grid place-content-center rounded-lg p-10">
          <h1 className="text-lg font-semibold md:text-xl">
            Create your recipe
          </h1>
        </div>
        <div className="py-4">
          <RecipeForm />
        </div>
      </Container>
    </div>
  );
}
