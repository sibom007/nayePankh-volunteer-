"use client";
import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignUp
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl={"/sync-user"}
      />
    </div>
  );
}

export default SignUpPage;
