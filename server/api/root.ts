import { createTRPCRouter } from '@/server/api/trpc';
import { transactionsRouter } from './routes/transactions';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  transactions: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
