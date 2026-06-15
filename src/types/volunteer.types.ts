import z from "zod";
import { applicationStatusSchema } from "./index";

export const createVolunteerSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/),
  city: z.string().trim().min(2).max(100),
  skills: z.array(z.string().trim().min(2).max(50)).min(1).max(10),
  motivation: z.string().trim().min(20).max(1000),
});




export const updateVolunteerSchema = createVolunteerSchema.partial().extend({
  status: applicationStatusSchema.optional(),

  adminNote: z.string().trim().min(3).max(500).optional(),
});

export const volunteerSearchSchema = z.object({
  query: z.string().trim().max(100).optional(),

  status: applicationStatusSchema.optional(),

  page: z.number().int().min(1).default(1),

  limit: z.number().int().min(1).max(100).default(10),
});

export type CreateVolunteerInput = z.infer<typeof createVolunteerSchema>;
export type UpdateVolunteerInput = z.infer<typeof updateVolunteerSchema>;
export type VolunteerSearchInput = z.infer<typeof volunteerSearchSchema>;
