import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  validationSchemaShortenCreate,
  validationSchemaShortenFind,
} from "../validation-schemas/shorten.schema";
import ShortenEntity from "@/server/businees-logic/shorten.entity";

export const shortenRouter = createTRPCRouter({
  create: publicProcedure
    .input(validationSchemaShortenCreate)
    .mutation(async ({ ctx, input }) => {
      new ShortenEntity().create(input);
    }),
  show: publicProcedure
    .input(validationSchemaShortenFind)
    .query(async ({ ctx, input }) => {
      new ShortenEntity().find(input);
    }),
});

const shortenURL = async (longUrl: string) => {};
