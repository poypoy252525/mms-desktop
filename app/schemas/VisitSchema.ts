import { z } from "zod";

export const visitSchema = z.object({
  deathId: z.string(),
});

export type VisitSchema = z.infer<typeof visitSchema>;
