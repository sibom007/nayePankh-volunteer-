import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AppliesError } from "@/feature/dashboard/applies/components/applies-error";
import { AppliesLoading } from "@/feature/dashboard/applies/components/applies-loading";
import { AppliesList } from "@/feature/dashboard/applies/components/applies-list";

export default async function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.admin.getVolunteers.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AppliesError />}>
        <Suspense fallback={<AppliesLoading />}>
          <AppliesList />;
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
