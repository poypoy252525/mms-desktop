import { z } from "zod";

export const staffSchema = z.object({
  name: z.string().min(2),
  fingerprintId: z.preprocess(
    (value) => parseInt(value as string),
    z.number().int().min(1)
  ),
});

export type StaffForm = z.infer<typeof staffSchema>;
