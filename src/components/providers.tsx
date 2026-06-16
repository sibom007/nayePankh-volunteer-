"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkProvider>
        <TRPCReactProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </TRPCReactProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
};
