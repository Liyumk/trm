import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  validationSchemaUrlCreate,
  validationSchemaUrlFind,
} from "../validation-schemas/url.schema";
import UrlEntity from "@/server/business-logic/url.entity";

export const urlRouter = createTRPCRouter({
  create: publicProcedure
    .input(validationSchemaUrlCreate)
    .mutation(async ({ ctx, input }) => {
      const data = await new UrlEntity().create(input);
      return data;
    }),
  show: publicProcedure
    .input(validationSchemaUrlFind)
    .query(async ({ ctx, input }) => {
      new UrlEntity().find(input);
    }),
});

const UrlURL = async (longUrl: string) => {};
