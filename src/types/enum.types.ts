import { z } from "zod";

export const roleSchema = z.enum(["ADMIN", "VOLUNTEER"]);

export const applicationStatusSchema = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
