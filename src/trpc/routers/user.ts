import { createTRPCRouter, baseProcedure, protectedProcedure } from "../init";
import { db } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { createUserSchema, updateUserSchema } from "@/types";

export const userRouter = createTRPCRouter({
  create: baseProcedure
    .input(createUserSchema)
    .mutation(async ({  input }) => {
      const exUser = await db.user.findFirst({
        where: { email: input.email },
      });

      if (!exUser) {
        await db.user.create({
          data: {
            ...input,
          },
        });

        return {
          code: "201",
          message: "user create successfully",
        };
      }
      return exUser;
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findUnique({
      where: { clerkId: ctx.userId },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "user not found" });
    }

    return user;
  }),

  updateProfile: protectedProcedure
    .input(updateUserSchema)
    .mutation(async ({ ctx, input }) => {
      return await db.user.update({
        where: {
          clerkId: ctx.userId,
        },
        data: {
          name: input.name,
        },
      });
    }),
});
