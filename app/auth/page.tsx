import { AuthForm, GoogleAuthButton } from "../_features/auth";

export default function Page() {
  return (
    <div className="centered h-full">
      <div className="mx-4 grid w-full max-w-80 gap-4">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p>Continue with your email address</p>
        </div>

        <AuthForm />

        <div className="flex items-center gap-2">
          <div className="bg-border h-0.5 grow"></div>
          <p className="text-sm">Or continue with</p>
          <div className="bg-border h-0.5 grow"></div>
        </div>

        <GoogleAuthButton />
      </div>
    </div>
  );
}
