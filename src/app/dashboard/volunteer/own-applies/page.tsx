import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { VolunteerApplication } from "@/feature/dashboard/own-applies/components/volunteer-application";
import VolunteerApplicationLoading from "@/feature/dashboard/own-applies/components/volunteer-application-loading";

export default function Page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.volunteer.getMyApplication.queryOptions(),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<VolunteerApplicationLoading />}>
        <VolunteerApplication />
      </Suspense>
    </HydrationBoundary>
  );
}
