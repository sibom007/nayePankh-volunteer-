"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function RolesLoading() {
  return (
    <div className="space-y-4 p-6">
      <Skeleton className="h-8 w-52" />

      <div className="rounded-lg border">
        <div className="space-y-3 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-28" />
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => window.location.reload()}>Reload Page</Button>
    </div>
  );
}
