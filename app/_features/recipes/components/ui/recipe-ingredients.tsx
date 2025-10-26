import type { Ingredient } from "@/app/_lib/drizzle/schema";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <div className="space-y-2 rounded-md p-6 shadow-md">
      <h2 className="text-lg font-semibold">Ingredients</h2>
      <div className="space-y-1">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex gap-2">
            {ingredient.quantity && (
              <span>
                {ingredient.quantity} {ingredient.unit}
              </span>
            )}
            <span>{ingredient.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
