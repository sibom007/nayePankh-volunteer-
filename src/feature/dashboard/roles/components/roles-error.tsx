"use client";

import { AlertTriangle } from "lucide-react";

export  function RolesError() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-4">
      <AlertTriangle className="text-destructive h-10 w-10" />

      <div className="text-center">
        <h2 className="text-xl font-semibold">Failed to load users</h2>

        <p className="text-muted-foreground">
          Something went wrong while fetching users.
        </p>
      </div>
    </div>
  );
}
