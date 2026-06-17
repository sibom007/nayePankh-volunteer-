"use client";

import { useTRPC } from "@/trpc/client";
import { ApplicationCard } from "./application-card";
import { useQuery } from "@tanstack/react-query";
import { FileSearch2 } from "lucide-react";
import { AppliesLoading } from "./applies-loading";
import { AppliesError } from "./applies-error";

export const AppliesList = () => {
  const trpc = useTRPC();
  const applications = useQuery(trpc.admin.getVolunteers.queryOptions());

  if (applications.error) return <AppliesError />;
  if (applications.isLoading) return <AppliesLoading />;
  const data = applications.data || [];

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-7xl px-6 py-2">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Applications</h1>

          <p className="mt-2 text-muted-foreground">
            Review, approve, or reject applications.
          </p>
        </div>

        {data.length === 0 ? (
          <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/40 p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <FileSearch2 className="size-8 text-muted-foreground" />
            </div>

            <h3 className="text-xl font-semibold">No applications found</h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              There are currently no volunteer applications to review. New
              applications will appear here once submitted.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
