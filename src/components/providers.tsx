"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
};
