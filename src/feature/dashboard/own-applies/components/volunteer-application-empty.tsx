import Link from "next/link";
import { FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function VolunteerApplicationEmpty() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="bg-muted mb-6 rounded-full p-4">
        <FileText className="h-10 w-10" />
      </div>

      <h2 className="text-2xl font-semibold">No Volunteer Application Found</h2>

      <p className="text-muted-foreground mt-2 max-w-md">
        You havent submitted a volunteer application yet. Complete the
        application form to start your journey as a volunteer.
      </p>

      <Button asChild className="mt-6">
        <Link href="/volunteer">Apply Now</Link>
      </Button>
    </div>
  );
}
