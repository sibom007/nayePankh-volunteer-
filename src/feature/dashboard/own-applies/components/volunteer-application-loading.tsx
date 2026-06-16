import { Skeleton } from "@/components/ui/skeleton";

export default function VolunteerApplicationLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <Skeleton className="h-32 w-full" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-52 w-full" />
        <Skeleton className="h-52 w-full" />
      </div>

      <Skeleton className="h-52 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
