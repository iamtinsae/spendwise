import { createTRPCRouter, protectedProcedure } from '../trpc';

export const transactionsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),
});
