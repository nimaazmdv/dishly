"use client";

import { Field, FieldError, FieldLabel } from "@/app/_components/ui/field";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { signinEmail } from "../lib/actions";

export function AuthForm() {
  const [state, SigninEmailAction, isPending] = useActionState(
    signinEmail,
    undefined,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Verification link sent to your email successfully");
    }
  }, [state]);

  return (
    <form action={SigninEmailAction} className="grid gap-4">
      <Field>
        <FieldLabel htmlFor="email">Email Address:</FieldLabel>
        <Input id="email" name="email" placeholder="example@gmail.com" />
        {state?.errors?.properties?.email?.errors[0] && (
          <FieldError>{state?.errors?.properties?.email?.errors[0]}</FieldError>
        )}
      </Field>

      <Button disabled={isPending}>Continue</Button>
    </form>
  );
}
