"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppliesError() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-red-100 p-4">
        <AlertTriangle className="h-10 w-10 text-red-600" />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Something went wrong</h2>

        <p className="mt-2 text-muted-foreground">
          Failed to load applications. Please try again.
        </p>
      </div>

      <Button onClick={() => window.location.reload()}>Reload Page</Button>
    </div>
  );
}
