import { z } from "zod";

export const fingerprintSchema = z.object({
  fingerprintId: z.number(),
});

export type FingerprintForm = z.infer<typeof fingerprintSchema>;
