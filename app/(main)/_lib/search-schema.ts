import { z } from "zod";

export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  query: z.string().optional(),
  order: z.enum(["latest", "popular"]).optional(),
});
