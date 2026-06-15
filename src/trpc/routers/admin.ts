import { adminOnlyProcedure, createTRPCRouter } from "../init";
import { db } from "@/lib/prisma";
import { approveVolunteerSchema, rejectVolunteerSchema } from "@/types";

export const adminRouter = createTRPCRouter({
  getVolunteers: adminOnlyProcedure.query(async ({ ctx }) => {
    return await db.volunteer.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  approve: adminOnlyProcedure
    .input(approveVolunteerSchema)
    .mutation(async ({ ctx, input }) => {
      return await db.volunteer.update({
        where: {
          id: input.volunteerId,
        },
        data: {
          status: "APPROVED",
        },
      });
    }),

  reject: adminOnlyProcedure
    .input(rejectVolunteerSchema)
    .mutation(async ({ ctx, input }) => {
      return await db.volunteer.update({
        where: {
          id: input.volunteerId,
        },
        data: {
          status: "REJECTED",
          adminNote: input.adminNote,
        },
      });
    }),
});
