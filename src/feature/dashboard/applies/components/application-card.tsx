"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import { RejectModal } from "./reject-modal";
import { Volunteer } from "@/generated/prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

interface Props {
  application: Volunteer;
}

export function ApplicationCard({ application }: Props) {
  const [status, setStatus] = useState(application.status);
  const [openReject, setOpenReject] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const approve = useMutation(
    trpc.admin.approve.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.admin.getVolunteers.queryOptions().queryKey,
        });
      },
    }),
  );
  const reject = useMutation(
    trpc.admin.reject.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.admin.getVolunteers.queryOptions().queryKey,
        });
      },
    }),
  );

  const handleApprove = () => {
    setStatus("APPROVED");
    approve.mutate({ volunteerId: application.id });
  };

  const handleReject = (reason: string) => {
    setStatus("REJECTED");

    reject.mutate({
      volunteerId: application.id,
      adminNote: reason,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}>
        <Card className="border-0 shadow-lg hover:shadow-2xl duration-300 bg-sidebar-accent ">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Applicant</h3>

              <StatusBadge status={status} />
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>Phone:</strong> {application.phone}
              </p>

              <p>
                <strong>City:</strong> {application.city}
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Skills</h4>

              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full bg-muted px-3 py-1 text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Motivation</h4>

              <p className="text-sm text-muted-foreground">
                {application.motivation}
              </p>
            </div>

            {status === "PENDING" && (
              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1"
                  icon={<Check className="mr-2 h-4 w-4" />}
                  onClick={handleApprove}
                  isLoading={approve.isPending}
                  disabled={approve.isPending}>
                  Approve
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => setOpenReject(true)}
                  icon={<X className="mr-2 h-4 w-4" />}
                  isLoading={reject.isPending}
                  disabled={reject.isPending}>
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <RejectModal
        open={openReject}
        onOpenChange={setOpenReject}
        onReject={handleReject}
      />
    </>
  );
}
