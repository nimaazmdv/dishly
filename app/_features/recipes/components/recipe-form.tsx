"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/app/_components/ui/field";
import { FilePicker } from "@/app/_components/app-ui/file-picker";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Button } from "@/app/_components/ui/button";
import { MinusIcon } from "lucide-react";

import { useActionState, useState } from "react";
import { createRecipe } from "../lib/actions";

export function RecipeForm() {
  const [state, createRecipeAction, isPending] = useActionState(
    createRecipe,
    undefined,
  );

  // Id is provided for proper field removal
  const [ingredients, setIngredients] = useState([
    { id: 1, quantity: "", unit: "", name: "" },
  ]);
  const [steps, setSteps] = useState([{ id: 1, instruction: "" }]);

  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      { id: prev.at(-1)!.id + 1, quantity: "", unit: "", name: "" },
    ]);
  }

  function addStep() {
    setSteps((prev) => [...prev, { id: prev.at(-1)!.id + 1, instruction: "" }]);
  }

  function removeIngredient(id: number) {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  }

  function removeStep(id: number) {
    setSteps((prev) => prev.filter((step) => step.id !== id));
  }

  return (
    <form action={createRecipeAction} className="space-y-4">
      <FieldGroup>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="image">Image</FieldLabel>
            <FilePicker id="image" name="image" />
            {state?.errors?.properties?.image?.errors[0] && (
              <FieldError>{state.errors.properties.image.errors[0]}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" placeholder="What are we cooking?" />
            {state?.errors?.properties?.title?.errors[0] && (
              <FieldError>{state.errors.properties.title.errors[0]}</FieldError>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Field>
              <FieldLabel htmlFor="prepTime">Prep time</FieldLabel>
              <Input id="prepTime" name="prepTime" placeholder="In minutes" />
              {state?.errors?.properties?.prepTime?.errors[0] && (
                <FieldError>
                  {state.errors.properties.prepTime.errors[0]}
                </FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="cookTime">Cook time</FieldLabel>
              <Input id="cookTime" name="cookTime" placeholder="In minutes" />
              {state?.errors?.properties?.cookTime?.errors[0] && (
                <FieldError>
                  {state.errors.properties.cookTime.errors[0]}
                </FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="servings">Servings</FieldLabel>
              <Input
                id="servings"
                name="servings"
                placeholder="For how many?"
              />
              {state?.errors?.properties?.servings?.errors[0] && (
                <FieldError>
                  {state.errors.properties.servings.errors[0]}
                </FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="difficulty">Difficulty</FieldLabel>
              <Select name="difficulty" defaultValue="easy">
                <SelectTrigger id="difficulty">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="difficulty">Difficult</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.properties?.difficulty?.errors[0] && (
                <FieldError>
                  {state.errors.properties.difficulty.errors[0]}
                </FieldError>
              )}
            </Field>
          </div>
        </FieldGroup>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend className="flex w-full items-center justify-between font-semibold">
            Ingredients
            <Button type="button" size="sm" onClick={() => addIngredient()}>
              Add ingredient
            </Button>
          </FieldLegend>
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <FieldSet key={ingredient.id}>
                <FieldLegend>Ingredient {index + 1}</FieldLegend>
                <div className="flex items-start gap-2">
                  <Field className="shrink-0 basis-16">
                    <FieldLabel htmlFor={`ingredients[${index}].quantity`}>
                      Quantity
                    </FieldLabel>
                    <Input
                      id={`ingredients[${index}].quantity`}
                      name={`ingredients[${index}].quantity`}
                      defaultValue={ingredient.quantity}
                    />
                    {state?.errors?.properties?.ingredients?.items?.[index]
                      .properties?.quantity?.errors[0] && (
                      <FieldError>
                        {
                          state.errors.properties.ingredients.items[index]
                            .properties.quantity.errors[0]
                        }
                      </FieldError>
                    )}
                  </Field>
                  <Field className="shrink-0 basis-16">
                    <FieldLabel htmlFor={`ingredients[${index}].unit`}>
                      Unit
                    </FieldLabel>
                    <Input
                      id={`ingredients[${index}].unit`}
                      name={`ingredients[${index}].unit`}
                      defaultValue={ingredient.unit}
                    />
                    {state?.errors?.properties?.ingredients?.items?.[index]
                      .properties?.unit?.errors[0] && (
                      <FieldError>
                        {
                          state.errors.properties.ingredients.items[index]
                            .properties.unit.errors[0]
                        }
                      </FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`ingredients[${index}].name`}>
                      Name
                    </FieldLabel>
                    <Input
                      id={`ingredients[${index}].name`}
                      name={`ingredients[${index}].name`}
                      defaultValue={ingredient.name}
                    />
                    {state?.errors?.properties?.ingredients?.items?.[index]
                      .properties?.name?.errors[0] && (
                      <FieldError>
                        {
                          state.errors.properties.ingredients.items[index]
                            .properties.name.errors[0]
                        }
                      </FieldError>
                    )}
                  </Field>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    className="self-end"
                    disabled={ingredients.length === 1}
                    onClick={() => removeIngredient(ingredient.id)}
                  >
                    <MinusIcon className="size-3.5" />
                  </Button>
                </div>
              </FieldSet>
            ))}
          </div>
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend className="flex w-full items-center justify-between font-semibold">
            Instructions
            <Button type="button" size="sm" onClick={() => addStep()}>
              Add instruction
            </Button>
          </FieldLegend>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-end gap-2">
                <Field>
                  <FieldLabel htmlFor={`instructions[${index}]`}>
                    Step {index + 1}
                  </FieldLabel>
                  <Textarea
                    id={`instructions[${index}]`}
                    name="instructions" // Handled by form data getAll
                    defaultValue={step.instruction}
                  />
                  {state?.errors?.properties?.instructions?.items?.[index]
                    .errors[0] && (
                    <FieldError>
                      {
                        state.errors.properties.instructions.items[index]
                          .errors[0]
                      }
                    </FieldError>
                  )}
                </Field>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  disabled={steps.length === 1}
                  onClick={() => removeStep(step.id)}
                >
                  <MinusIcon className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </FieldSet>
      </FieldGroup>

      <Button disabled={isPending}>Create recipe</Button>
    </form>
  );
}
