import { z } from "zod";

export const roleSchema = z.enum(["ADMIN", "VOLUNTEER", "USER"]);

export const role = {
  ADMIN: "ADMIN",
  VOLUNTEER: "VOLUNTEER",
  USER: "USER",
} as const;

export const applicationStatusSchema = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
