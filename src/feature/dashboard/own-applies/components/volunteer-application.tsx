"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import VolunteerApplicationEmpty from "./volunteer-application-empty";

export function VolunteerApplication() {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.volunteer.getMyApplication.queryOptions(),
  );

  if (!data) {
    return <VolunteerApplicationEmpty />;
  }

  const statusVariant =
    data.status === "APPROVED"
      ? "default"
      : data.status === "REJECTED"
        ? "destructive"
        : "secondary";

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Hero Card */}
      <Card className="overflow-hidden py-0">
        <div className="from-primary/10 via-background to-background bg-linear-to-r p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Volunteer Application</h1>

              <p className="text-muted-foreground mt-2">
                Track your application status and review details.
              </p>
            </div>

            <Badge variant={statusVariant} className="px-5 py-2 text-sm">
              {data.status}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6 ">
            <Phone className="text-primary h-8 w-8" />

            <div>
              <p className="text-muted-foreground text-sm">Phone Number</p>
              <p className="font-semibold">{data.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <MapPin className="text-primary h-8 w-8" />

            <div>
              <p className="text-muted-foreground text-sm">City</p>
              <p className="font-semibold">{data.city}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <ShieldCheck className="text-primary h-8 w-8" />

            <div>
              <p className="text-muted-foreground text-sm">
                Application Status
              </p>
              <p className="font-semibold">{data.status}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Motivation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Why You Want To Volunteer</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground leading-8">{data.motivation}</p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex gap-3">
              <CalendarDays className="text-primary h-5 w-5" />

              <div>
                <p className="text-sm font-medium">Submitted</p>

                <p className="text-muted-foreground text-sm">
                  {new Date(data.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock3 className="text-primary h-5 w-5" />

              <div>
                <p className="text-sm font-medium">Last Updated</p>

                <p className="text-muted-foreground text-sm">
                  {new Date(data.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Expertise</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-4 py-1.5">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Note */}
      {data.adminNote && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="text-destructive h-5 w-5" />
              Admin Feedback
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="leading-7">{data.adminNote}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
