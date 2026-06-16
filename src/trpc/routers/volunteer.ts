import { createTRPCRouter, protectedProcedure } from "../init";
import { createVolunteerSchema, updateVolunteerSchema } from "@/types";
import { db } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const volunteerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createVolunteerSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await db.user.findUnique({
        where: {
          clerkId: ctx.userId,
        },
        include: {
          volunteer: true,
        },
      });
      console.log("🚀 ~ user:", user);

      if (!user || user.volunteer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "user have one Request in previce time",
        });
      }

      return await db.volunteer.create({
        data: {
          userId: user.id,
          ...input,
        },
      });
    }),

  getMyApplication: protectedProcedure.query(async ({ ctx }) => {
    return await db.volunteer.findUnique({
      where: {
        userId: ctx.userId,
      },
    });
  }),

  update: protectedProcedure
    .input(updateVolunteerSchema)
    .mutation(async ({ ctx, input }) => {
      return await db.volunteer.update({
        where: {
          userId: ctx.userId,
        },
        data: input,
      });
    }),
});
