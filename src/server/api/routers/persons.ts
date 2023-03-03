import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

const Person = z.object({
  name: z.string(),
  prompt: z.string(),
  image: z.string(),
  id: z.string(),
});
export const persons = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ search: z.string() }))
    .output(z.object({ persons: z.array(Person) }))
    .mutation(async ({ input: { search } }) => {
      const persons = await prisma.person.findMany({
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { prompt: { contains: search, mode: "insensitive" } },
          ],
        },
        take: 8,
      });
      return { persons };
    }),
  new: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string(),
        prompt: z.string(),
      })
    )
    .output(Person)
    .mutation(async ({ input, ctx }) => {
      const person = await prisma.person.create({
        data: {
          ...input,
          creator: { connect: { id: ctx.session.user.id } },
        },
      });
      return person;
    }),
  edit: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string(),
        prompt: z.string(),
        id: z.string(),
      })
    )
    .output(Person)
    .mutation(async ({ input, ctx }) => {
      const person = await prisma.person.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          creator: { connect: { id: ctx.session.user.id } },
        },
      });
      return person;
    }),
});
