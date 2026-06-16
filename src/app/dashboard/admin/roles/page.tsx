import RolesError from "@/feature/dashboard/roles/components/roles-error";
import { RolesList } from "@/feature/dashboard/roles/components/roles-list";
import RolesLoading from "@/feature/dashboard/roles/components/roles-loading";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export default function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.admin.getUsers.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<RolesError />}>
        <Suspense fallback={<RolesLoading />}>
          <RolesList />;
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
