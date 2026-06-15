import { z } from "zod";
import { roleSchema } from "./index";

export const createUserSchema = z.object({
  clerkId: z.string().min(1).max(255),
  name: z.string().trim().min(2).max(100).optional(),
  email: z.string().trim().email().max(255),
  role: roleSchema.default("VOLUNTEER"),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
