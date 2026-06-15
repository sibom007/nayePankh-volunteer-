"use client";
import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/sync-user" // Use FORCE instead of fallback
      />
    </div>
  );
}

export default SignInPage;
