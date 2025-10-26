import type { Step } from "@/app/_lib/drizzle/schema";

interface RecipeStepsProps {
  steps: Step[];
}

export function RecipeSteps({ steps }: RecipeStepsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold min-[850px]:text-2xl">
        Cooking <span className="text-brand">Instructions</span>
      </h2>
      <div className="grid gap-2 min-[850px]:grid-cols-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-secondary text-secondary-foreground flex items-start gap-4 rounded-md p-4"
          >
            <span className="text-brand text-xl font-medium">
              {step.number < 10 ? `0${step.number}` : step.number}
            </span>
            <p>{step.instruction}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
