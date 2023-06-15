import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { validationShcemaShortenCreate } from "../validation-schemas/shorten.schema";

export const shortenRouter = createTRPCRouter({
  create: publicProcedure
    .input(validationShcemaShortenCreate)
    .mutation(async ({ ctx, input }) => {
      const { url } = input;
      console.log(`Long URL: ${url}`);
    }),
});
