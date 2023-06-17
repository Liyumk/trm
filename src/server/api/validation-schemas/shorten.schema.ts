import { z } from "zod";

export const validationSchemaShortenCreate = z.object({
  url: z.string(),
  alias: z.string().optional(),
});

export type ValidationSchemaShortenCreate = z.TypeOf<
  typeof validationSchemaShortenCreate
>;

export const validationSchemaShortenFind = z.object({
  url: z.string().url(),
});

export type ValidationSchemaShortenFind = z.TypeOf<
  typeof validationSchemaShortenFind
>;
