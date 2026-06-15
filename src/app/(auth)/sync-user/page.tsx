"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, Home } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export default function Page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const trpc = useTRPC();

  // Prevents double-syncing in Strict Mode
  const hasAttemptedSync = useRef(false);

  // Clean initialization keeping it pure from side-effects during render
  const createUser = useMutation(trpc.user.create.mutationOptions());

  useEffect(() => {
    // 1. Guard clause: Wait until Clerk is fully loaded
    if (!isLoaded) return;

    // 2. Guard clause: Ensure a valid authenticated user session exists
    if (!user) {
      router.replace("/sign-in");
      return;
    }

    // 3. Optimization Guard: Skip database sync if already flag-synced locally
    const hasSynced = localStorage.getItem("is_synced");
    if (hasSynced) {
      router.replace("/");
      return;
    }

    // 4. Atomic Sync Trigger: Executes exactly once
    if (!hasAttemptedSync.current) {
      hasAttemptedSync.current = true;

      createUser.mutate(
        {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          name: user.fullName || "User",
        },
        {
          onSuccess: () => {
            localStorage.setItem("is_synced", "true");
            router.replace("/");
          },
          onError: (error) => {
            console.error("User sync failed:", error);
          },
        },
      );
    }
  }, [isLoaded, user, router, createUser]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background text-foreground p-6 select-none">
      {/* Visual Identity Container */}
      <div className="relative flex items-center justify-center h-24 w-24">
        {createUser.isError ? (
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-destructive/10 text-destructive text-2xl border border-destructive/20 shadow-sm">
            ⚠️
          </div>
        ) : (
          <>
            {/* Outer spinning loading ring */}
            <Loader2 className="h-16 w-16 animate-spin text-primary opacity-25" />

            {/* Inner static pulsing secure emblem */}
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-primary animate-pulse drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
            </div>
          </>
        )}
      </div>

      {/* Dynamic Status / Feedback Block */}
      <div className="mt-6 text-center space-y-2 max-w-sm">
        <h2 className="text-xl font-bold tracking-tight">
          {createUser.isError ? "Syncing issue" : "Finalizing setup"}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {createUser.isError
            ? "We couldn't update your profile in our database, but you can still access the dashboard."
            : "We're securing your workspace environment and building your active dashboard layout."}
        </p>

        {/* Clean "Go Home" button if an error occurs */}
        {createUser.isError && (
          <div className="pt-2">
            <button
              onClick={() => router.replace("/")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium shadow-sm hover:bg-primary/90 active:scale-95 transition-all cursor-pointer">
              <Home className="h-4 w-4" /> Go to Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Corporate Security Footer Branding */}
      <div className="absolute bottom-10 text-[10px] uppercase tracking-[0.25em] font-medium text-muted-foreground/40 antialiased">
        NayaPankh Security Protocol
      </div>
    </div>
  );
}
