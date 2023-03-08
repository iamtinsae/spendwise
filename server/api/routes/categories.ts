import z from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const categoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.category.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  // --- Mutations
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
});
