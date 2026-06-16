import { Role } from "@/generated/prisma/enums";
import z from "zod";

export const approveVolunteerSchema = z.object({
  volunteerId: z.string().min(1),

  adminNote: z.string().trim().min(3).max(500).optional(),
});

export const rejectVolunteerSchema = z.object({
  volunteerId: z.string().min(1),

  adminNote: z.string().trim().min(5).max(500),
});

export const updateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.nativeEnum(Role),
});
