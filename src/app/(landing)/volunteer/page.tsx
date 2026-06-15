"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useTRPC } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  phone: z.string().min(8, "Phone number is required").max(20),

  city: z.string().trim().min(2, "City is required").max(100),

  skills: z.string().trim().min(2, "Please enter at least one skill"),

  motivation: z.string().trim().min(20, "Minimum 20 characters").max(1000),
});

type FormValues = z.infer<typeof formSchema>;

export default function VolunteerPage() {
  const trpc = useTRPC();

  const createVolunteer = useMutation(
    trpc.volunteer.create.mutationOptions({
      onSuccess: (data) => {
        console.log("🚀 ~ VolunteerPage ~ data:", data);
      },
    }),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      phone: "",
      city: "",
      skills: "",
      motivation: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await createVolunteer.mutateAsync({
      phone: values.phone,
      city: values.city,

      skills: values.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      motivation: values.motivation,
    });
  };

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Volunteer Registration</CardTitle>

          <CardDescription>
            Join NayePankh Foundation and help us create meaningful impact in
            communities.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldSet>
              <FieldTitle>Volunteer Information</FieldTitle>

              <FieldGroup>
                {/* Phone */}
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Phone Number</FieldLabel>

                      <FieldContent>
                        <Input placeholder="+91 9876543210" {...field} />

                        <FieldDescription>
                          Include country code if applicable.
                        </FieldDescription>

                        {fieldState.error && (
                          <FieldError>{fieldState.error.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />

                {/* City */}
                <Controller
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>City</FieldLabel>

                      <FieldContent>
                        <Input placeholder="Kolkata" {...field} />

                        {fieldState.error && (
                          <FieldError>{fieldState.error.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />

                {/* Skills */}
                <Controller
                  control={form.control}
                  name="skills"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Skills</FieldLabel>

                      <FieldContent>
                        <Input
                          placeholder="React, Next.js, Teaching, Design"
                          {...field}
                        />

                        <FieldDescription>
                          Separate multiple skills with commas.
                        </FieldDescription>

                        {fieldState.error && (
                          <FieldError>{fieldState.error.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />

                {/* Motivation */}
                <Controller
                  control={form.control}
                  name="motivation"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Why do you want to volunteer?</FieldLabel>

                      <FieldContent>
                        <Textarea
                          rows={6}
                          placeholder="Tell us about your motivation, experience, and how you'd like to contribute..."
                          {...field}
                        />

                        <FieldDescription>
                          Minimum 20 characters.
                        </FieldDescription>

                        {fieldState.error && (
                          <FieldError>{fieldState.error.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <Button
              type="submit"
              className="w-full"
              disabled={createVolunteer.isPending}>
              {createVolunteer.isPending
                ? "Submitting..."
                : "Submit Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
