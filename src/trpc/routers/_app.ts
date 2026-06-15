import { userRouter } from "./user";
import { adminRouter } from "./admin";
import { createTRPCRouter } from "../init";
import { volunteerRouter } from "./volunteer";
export const appRouter = createTRPCRouter({
  user: userRouter,
  volunteer: volunteerRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
