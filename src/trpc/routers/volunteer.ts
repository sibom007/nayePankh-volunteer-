import { createTRPCRouter, protectedProcedure } from "../init";
import { createVolunteerSchema, updateVolunteerSchema } from "@/types";
import { db } from "@/lib/prisma";

export const volunteerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createVolunteerSchema)
    .mutation(async ({ ctx, input }) => {
      return await db.volunteer.create({
        data: {
          userId: ctx.userId,
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
