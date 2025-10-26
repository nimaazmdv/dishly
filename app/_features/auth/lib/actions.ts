"use server";

import { headers } from "next/headers";
import { treeifyError } from "zod";
import { auth } from "@/app/_lib/auth";
import { emailSchema } from "./schema";

export async function signinEmail(prevState: any, formData: FormData) {
  const result = emailSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    console.log(treeifyError(result.error));
    return { success: false, errors: treeifyError(result.error) };
  }

  await auth.api.signInMagicLink({
    body: {
      email: result.data.email,
      name: result.data.email.split("@")[0],
      callbackURL: "/",
      newUserCallbackURL: "/",
      errorCallbackURL: "/auth",
    },
    headers: await headers(),
  });

  return { success: true };
}
