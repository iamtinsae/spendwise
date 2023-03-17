import { TransactionType } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const transactionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      include: {
        category: true,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        note: z.string(),
        type: z.enum([TransactionType.DEPOSIT, TransactionType.WITHDRAW]),
        categoryId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.transaction.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
});
