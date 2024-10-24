import { z } from "zod";

export const ownerSchema = z.object({
  name: z.string(),
  burialId: z.string(),
});

export type OwnerZod = z.infer<typeof ownerSchema>;
