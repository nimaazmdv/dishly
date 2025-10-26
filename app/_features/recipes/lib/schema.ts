import { z } from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "Required"),
  quantity: z
    .string()
    .min(1, "Required")
    .refine((val) => !Number.isNaN(+val) && +val > 0, {
      error: "Must be a positive number",
    })
    .transform((val) => +val),
  unit: z.string(),
});

export const recipeSchema = z.object({
  image: z.file().optional(),
  title: z.string().min(1, "Required"),
  prepTime: z
    .string()
    .min(1, "Required")
    .refine(
      (val) => !Number.isNaN(+val) && Number.isInteger(+val) && +val >= 0,
      { error: "Must be zero or a positive integer" },
    )
    .transform((val) => +val),
  cookTime: z
    .string()
    .min(1, "Required")
    .refine(
      (val) => !Number.isNaN(+val) && Number.isInteger(+val) && +val >= 0,
      { error: "Must be zero or a positive integer" },
    )
    .transform((val) => +val),
  servings: z
    .string()
    .min(1, "Required")
    .refine(
      (val) => !Number.isNaN(+val) && Number.isInteger(+val) && +val >= 1,
      { error: "Must be an integer more than 1" },
    )
    .transform((val) => +val),
  difficulty: z.enum(["easy", "intermediate", "difficult"]),
  ingredients: z.array(ingredientSchema).min(1),
  instructions: z.array(z.string().min(1, "Required")).min(1),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;
