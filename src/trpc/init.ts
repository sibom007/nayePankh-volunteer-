import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
import SuperJSON from "superjson";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: SuperJSON,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return next({ ctx: { ...ctx, userId } });
});

export const adminOnlyProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    // 1. Fetch the user from the database
    const dbUser = await db.user.findUnique({
      where: { clerkId: ctx.userId },
      select: {
        id: true,
        role: true,
      },
    });

    // 2. Fail if they don't exist in the DB
    if (!dbUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User account not found in database.",
      });
    }

    // 3. Strict Validation: Block them if they are not an ADMIN
    if (dbUser.role !== "ADMIN") {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Access denied. Admin role required.",
      });
    }

    // 4. If they passed the check, forward the context safely
    return next({
      ctx: {
        ...ctx,
        dbUserId: dbUser.id,
        role: dbUser.role,
      },
    });
  },
);
