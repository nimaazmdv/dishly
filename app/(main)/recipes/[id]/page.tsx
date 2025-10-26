import { Container } from "@/app/_components/app-ui/container";
import { RecipeDetails } from "@/app/_features/recipes";

export default function Page(props: PageProps<"/recipes/[id]">) {
  return (
    <div className="py-10">
      <Container>
        <RecipeDetails idPromise={props.params.then((params) => params.id)} />
      </Container>
    </div>
  );
}
