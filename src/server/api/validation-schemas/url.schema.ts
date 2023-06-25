import { z } from "zod";

export const validationSchemaUrlCreate = z.object({
  luid: z.string(),
  url: z.string(),
  alias: z.string().optional(),
});

export type ValidationSchemaUrlCreate = z.TypeOf<
  typeof validationSchemaUrlCreate
>;

export const validationSchemaUrlFind = z.object({
  url: z.string().url(),
  luid: z.string(),
});

export type ValidationSchemaUrlFind = z.TypeOf<typeof validationSchemaUrlFind>;

export const validationSchemaUrlFindUrlByShortUrl = z.object({
  shortCode: z.string(),
  alias: z.string().optional(),
});

export type ValidationSchemaUrlFindUrlByShortUrl = z.TypeOf<
  typeof validationSchemaUrlFindUrlByShortUrl
>;
