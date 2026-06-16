import { adminOnlyProcedure, createTRPCRouter } from "../init";
import { db } from "@/lib/prisma";
import {
  approveVolunteerSchema,
  rejectVolunteerSchema,
  updateUserRoleSchema,
} from "@/types";

export const adminRouter = createTRPCRouter({
  getVolunteers: adminOnlyProcedure.query(async () => {
    return await db.volunteer.findMany({
      where: {
        status: "PENDING",
      },
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
    .mutation(async ({ input }) => {
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
    .mutation(async ({ input }) => {
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

  getUsers: adminOnlyProcedure.query(async ({ ctx }) => {
    return await db.user.findMany({
      where: {
        NOT: { clerkId: ctx.userId },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        clerkId: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),

  updateUserRole: adminOnlyProcedure
    .input(updateUserRoleSchema)
    .mutation(async ({ input }) => {
      return await db.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: input.role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
    }),
});
