import { z } from "zod";

export const deceasedSchema = z.object({
  name: z.string(),
  burialId: z.string(),
});

export type DeceasedZod = z.infer<typeof deceasedSchema>;
