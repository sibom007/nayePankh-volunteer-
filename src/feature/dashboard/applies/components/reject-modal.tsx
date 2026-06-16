"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface RejectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReject: (reason: string) => void;
}

export function RejectModal({
  open,
  onOpenChange,
  onReject,
}: RejectModalProps) {
  const [reason, setReason] = useState("");

  const handleReject = () => {
    if (!reason.trim()) return;

    onReject(reason);
    setReason("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Application</DialogTitle>
        </DialogHeader>

        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Write why this application is being rejected..."
          className="min-h-35"
        />

        <Button variant="destructive" onClick={handleReject}>
          Confirm Rejection
        </Button>
      </DialogContent>
    </Dialog>
  );
}
