"use client";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateVolunteerInput, createVolunteerSchema } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { MultiSelect } from "@/components/multi-select";

const STEPS = {
  PERSONAL: 1,
  EXPERIENCE: 2,
} as const;

type Step = (typeof STEPS)[keyof typeof STEPS];

export const VolunteerForm = () => {
  const trpc = useTRPC();
  const [step, setStep] = useState<Step>(STEPS.PERSONAL);

  const form = useForm<CreateVolunteerInput>({
    resolver: zodResolver(createVolunteerSchema),
    defaultValues: {
      phone: "",
      city: "",
      skills: [],
      motivation: "",
    },
    mode: "onChange",
  });

  const createVolunteer = useMutation(
    trpc.volunteer.create.mutationOptions({
      onSuccess: () => {
        toast.success("Application submitted successfully!");
        form.reset();
        setStep(STEPS.PERSONAL);
      },
      onError: (error) => {
        try {
          const zodErrors = JSON.parse(error.message);

          if (
            Array.isArray(zodErrors) &&
            zodErrors.length > 0 &&
            zodErrors[0].message
          ) {
            toast.error(zodErrors[0].message);
            return; // Exit early since we successfully handled the Zod error
          }
        } catch {}

        // Fallback handler for standard string errors
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong.");
        }
      },
    }),
  );

  const nextStep = async () => {
    const fieldsToValidate: (keyof CreateVolunteerInput)[] =
      step === STEPS.PERSONAL ? ["phone", "city"] : ["skills", "motivation"];

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && step === STEPS.PERSONAL) {
      setStep(STEPS.EXPERIENCE);
    }
  };

  const prevStep = () => {
    setStep(STEPS.PERSONAL);
  };

  const onSubmit = async (values: CreateVolunteerInput) => {
    await createVolunteer.mutateAsync({
      phone: values.phone,
      city: values.city,
      skills: values.skills,
      motivation: values.motivation,
    });
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl items-center justify-center px-4 py-6 mt-14">
      {/* Reduced outer container max-width to max-w-4xl for a tighter, compact grid layout */}
      <Card className="grid w-full grid-cols-1 overflow-hidden border bg-card shadow-lg md:grid-cols-12 md:min-h-120 mt-0 pt-0 pb-0">
        {/* Left Side Cover Image Panel */}
        <div className="relative hidden bg-muted md:col-span-5 md:block">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
            alt="Volunteers working together"
            fill
            priority
            className="object-cover contrast-[1.02] brightness-90"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <h2 className="text-2xl font-bold tracking-tight leading-tight">
              Make a Difference
            </h2>
            <p className="text-xs leading-relaxed text-gray-300">
              Join our network and help create meaningful impact in communities
              through your dedication.
            </p>
          </div>
        </div>

        {/* Right Side Form Content */}
        <div className="flex flex-col justify-center p-5 sm:p-8 md:col-span-7">
          <div className="w-full space-y-5">
            <CardHeader className="p-0 space-y-1 flex justify-between">
              <div>
                <CardTitle className="text-xl font-bold tracking-tight text-center md:text-left">
                  Volunteer Registration
                </CardTitle>
                <CardDescription className="text-xs text-center md:text-left">
                  {step === STEPS.PERSONAL
                    ? "Let's start with your contact information."
                    : "Tell us about your skills and motivation."}
                </CardDescription>
              </div>

              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-center pt-1 md:justify-start">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300 ${
                        step >= STEPS.PERSONAL
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-muted"
                      }`}>
                      {step > STEPS.PERSONAL ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        "1"
                      )}
                    </div>
                    <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                      Personal
                    </span>
                  </div>

                  <div
                    className={`mx-3 h-0.5 w-16 rounded-full transition-all duration-300 ${
                      step === STEPS.EXPERIENCE ? "bg-primary" : "bg-muted"
                    }`}
                  />

                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-300 ${
                        step === STEPS.EXPERIENCE
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-muted"
                      }`}>
                      2
                    </div>
                    <span className="mt-1 text-[10px] font-medium text-muted-foreground">
                      Experience
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5">
                <div className="relative min-h-58.75 overflow-hidden">
                  {/* STEP 1 */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      step === STEPS.PERSONAL
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-6 opacity-0 pointer-events-none"
                    }`}>
                    <FieldSet>
                      <FieldGroup className="space-y-3.5">
                        <Controller
                          control={form.control}
                          name="phone"
                          render={({ field, fieldState }) => (
                            <Field className="space-y-1">
                              <FieldLabel className="text-xs font-medium">
                                Phone Number
                              </FieldLabel>
                              <FieldContent>
                                <Input
                                  placeholder="+91 9876543210"
                                  className="h-9 text-sm"
                                  {...field}
                                />
                                {fieldState.error && (
                                  <FieldError className="text-[11px] text-destructive mt-0.5">
                                    {fieldState.error.message}
                                  </FieldError>
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />

                        <Controller
                          control={form.control}
                          name="city"
                          render={({ field, fieldState }) => (
                            <Field className="space-y-1">
                              <FieldLabel className="text-xs font-medium">
                                City
                              </FieldLabel>
                              <FieldContent>
                                <Input
                                  placeholder="Kolkata"
                                  className="h-9 text-sm"
                                  {...field}
                                />
                                {fieldState.error && (
                                  <FieldError className="text-[11px] text-destructive mt-0.5">
                                    {fieldState.error.message}
                                  </FieldError>
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </FieldSet>
                  </div>

                  {/* STEP 2 */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      step === STEPS.EXPERIENCE
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0 pointer-events-none"
                    }`}>
                    <FieldSet>
                      <FieldGroup className="space-y-3.5">
                        <Controller
                          control={form.control}
                          name="skills"
                          render={({ field, fieldState }) => (
                            <Field className="space-y-1">
                              <FieldLabel className="text-xs font-medium">
                                Skills
                              </FieldLabel>
                              <FieldContent>
                                <MultiSelect
                                  selected={field.value || []} // Fallback to empty array if undefined
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  ref={field.ref}
                                  placeholder="React, Teaching, Design... (Press Enter to add)"
                                />
                                {fieldState.error && (
                                  <FieldError className="text-[11px] text-destructive mt-0.5">
                                    {fieldState.error.message}
                                  </FieldError>
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />

                        <Controller
                          control={form.control}
                          name="motivation"
                          render={({ field, fieldState }) => (
                            <Field className="space-y-1">
                              <FieldLabel className="text-xs font-medium">
                                Why do you want to volunteer?
                              </FieldLabel>
                              <FieldContent>
                                <Textarea
                                  rows={4}
                                  className="resize-none text-sm min-h-22.5 py-2"
                                  placeholder="Tell us about your motivation..."
                                  {...field}
                                />
                                {fieldState.error && (
                                  <FieldError className="text-[11px] text-destructive mt-0.5">
                                    {fieldState.error.message}
                                  </FieldError>
                                )}
                              </FieldContent>
                            </Field>
                          )}
                        />
                      </FieldGroup>
                    </FieldSet>
                  </div>
                </div>

                {/* Actions Footer Container */}
                <div className="flex gap-2.5 border-t pt-4">
                  {step === STEPS.EXPERIENCE && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 h-9 text-xs"
                      onClick={prevStep}>
                      <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                      Back
                    </Button>
                  )}

                  {step === STEPS.PERSONAL ? (
                    <Button
                      type="button"
                      size="sm"
                      className="flex-1 h-9 text-xs"
                      onClick={nextStep}>
                      Continue
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="sm"
                      className="flex-1 h-9 text-xs"
                      disabled={createVolunteer.isPending}>
                      {createVolunteer.isPending
                        ? "Submitting..."
                        : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};
