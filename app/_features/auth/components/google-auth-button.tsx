"use client";

import { Button } from "@/app/_components/ui/button";
import { GoogleIcon } from "./icons/google-icon";

import { authClient } from "@/app/_lib/auth-client";

export function GoogleAuthButton() {
  return (
    <Button
      variant="outline"
      onClick={() => authClient.signIn.social({ provider: "google" })}
    >
      <GoogleIcon />
      Google
    </Button>
  );
}
