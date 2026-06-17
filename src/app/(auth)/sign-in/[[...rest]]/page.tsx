"use client";

import { SignIn } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const accounts = [
  {
    role: "ADMIN",
    email: "vaispark400@gmail.com",
    password: "sibom@1234",
  },
  {
    role: "VOLUNTEER",
    email: "sibomsaha77@gmail.com",
    password: "sibom@1234",
  },
  {
    role: "USER",
    email: "sibomsaha787@gmail.com",
    password: "sibom@1234",
  },
];

function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center relative bg-muted/20">
      {/* Demo Login Info */}
      <Card className="fixed top-5 right-5 w-80 max-h-[85vh] shadow-xl border-primary/20 z-50">
        <CardHeader className="pb-3">
          <Badge className="w-fit mb-2">Demo Account</Badge>

          <CardTitle className="text-lg font-bold">
            Test Login Credentials
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Use the following account to explore the application.
          </p>
        </CardHeader>

        <ScrollArea className="h-[60vh]">
          <CardContent className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.email}
                className="rounded-xl border bg-muted/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{account.role}</span>

                  <Badge variant="secondary">{account.role}</Badge>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 mt-0.5 text-primary" />

                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{account.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lock className="h-4 w-4 mt-0.5 text-primary" />

                  <div>
                    <p className="text-xs text-muted-foreground">Password</p>
                    <p className="text-sm font-medium">{account.password}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
              <p className="text-xs text-muted-foreground">
                These demo accounts are available for testing different user
                roles.
              </p>
            </div>
          </CardContent>
        </ScrollArea>
      </Card>

      <SignIn
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/sync-user"
      />
    </div>
  );
}

export default SignInPage;
