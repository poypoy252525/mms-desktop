import { z } from "zod";

export const fingerprintSchema = z.object({
  fingerprintId: z.number(),
  attendanceId: z.string().min(5),
});

export type FingerprintForm = z.infer<typeof fingerprintSchema>;
