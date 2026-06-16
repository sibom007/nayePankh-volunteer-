"use client";

import React from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Fingerprint,
  Clock,
} from "lucide-react";
import { UserAvatar } from "@/lib/user-avatar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const ProfileView = () => {
  const trpc = useTRPC();

  // 1. Fetching live data using your tRPC query options wrapper
  const { data, isLoading, isError } = useQuery(trpc.user.me.queryOptions());

  // 2. Format dates cleanly helper
  const formatDate = (dateString: Date | string | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-7xl bg-card border rounded-2xl shadow-sm overflow-hidden animate-pulse">
          <div className="h-32 bg-muted" />
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
              <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl bg-muted border" />
              <div className="space-y-2 pb-2 flex-1">
                <div className="h-7 w-48 bg-muted rounded" />
                <div className="h-4 w-36 bg-muted rounded" />
              </div>
            </div>
            <hr className="border-muted/60 my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-muted/40 border" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-destructive">
        Failed to load profile data. Please try refreshing.
      </div>
    );
  }

  // 3. Destructure live real-time variables from data hook
  const safeName = data.name || "User Profile";
  const userEmail = data.email || "No email provided";
  const userRole = data.role || "USER";

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-7xl bg-card border rounded-2xl shadow-sm overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="h-32 bg-linear-to-r from-sidebar-primary/80 via-primary/70 to-sidebar-primary/60 relative" />

        {/* Profile Header Content */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 mb-6">
            {/* Avatar Frame */}
            <div className="p-1 rounded-2xl bg-card border shadow-md inline-block shrink-0">
              <UserAvatar
                name={safeName}
                className="h-24 w-24 sm:h-28 sm:w-28 text-2xl sm:text-3xl rounded-xl tracking-wide font-bold"
              />
            </div>

            {/* Profile Core Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground capitalize">
                  {safeName}
                </h1>
                {/* Dynamic Access Level Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                  <ShieldCheck className="size-3.5" />
                  {userRole}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {userEmail}
              </p>
            </div>
          </div>

          <hr className="border-muted/60 my-6" />

          {/* Detailed Account Grid Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Core Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Profile Details
              </h3>

              {/* Full Name Info Box */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border">
                <User className="size-5 text-muted-foreground shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-muted-foreground font-medium">
                    Display Name
                  </span>
                  <span className="text-sm font-medium text-foreground truncate capitalize">
                    {safeName}
                  </span>
                </div>
              </div>

              {/* Email Address Info Box */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border">
                <Mail className="size-5 text-muted-foreground shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-muted-foreground font-medium">
                    Email Address
                  </span>
                  <span className="text-sm font-medium text-foreground truncate">
                    {userEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Metadata Identities */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                System Identifiers
              </h3>

              {/* Internal Unique Database Object ID */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border">
                <Fingerprint className="size-5 text-muted-foreground shrink-0" />
                <div className="flex flex-col min-w-0 w-full">
                  <span className="text-xs text-muted-foreground font-medium">
                    Internal Identifier (ID)
                  </span>
                  <span className="text-xs font-mono text-foreground select-all truncate bg-muted/80 px-1.5 py-0.5 rounded mt-0.5 border w-fit max-w-full">
                    {data.id}
                  </span>
                </div>
              </div>

              {/* External Auth Clerk Provider Connection ID */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border">
                <Fingerprint className="size-5 text-muted-foreground shrink-0" />
                <div className="flex flex-col min-w-0 w-full">
                  <span className="text-xs text-muted-foreground font-medium">
                    External Auth Key (Clerk ID)
                  </span>
                  <span className="text-xs font-mono text-foreground select-all truncate bg-muted/80 px-1.5 py-0.5 rounded mt-0.5 border w-fit max-w-full">
                    {data.clerkId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-muted/60 my-6" />

          {/* Footer Time Metrics */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>
                Joined Platform: <strong>{formatDate(data.createdAt)}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>
                Profile Refreshed: <strong>{formatDate(data.updatedAt)}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
