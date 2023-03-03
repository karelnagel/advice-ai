import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const chat = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .output(z.object({}))
    .mutation(async ({ input: { id }, ctx }) => {
      await prisma.chat.delete({
        where: {
          personId_userId: {
            personId: id,
            userId: ctx.session.user.id,
          },
        },
      });
      return {};
    }),
});
