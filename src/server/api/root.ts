import { createTRPCRouter } from "@/server/api/trpc";
import { shortenRouter } from "./routers/shorten.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  url: shortenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
