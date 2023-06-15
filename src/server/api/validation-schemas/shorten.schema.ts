import { z } from "zod";

export const validationShcemaShortenCreate = z.object({
  url: z.string().url(),
});
