import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Please provide an email address")
    .pipe(z.email("Provided email address is invalid")),
});
