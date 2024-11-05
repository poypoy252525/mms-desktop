import { z } from "zod";

export const ownerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  burialId: z.string(),
});

export type OwnerZod = z.infer<typeof ownerSchema>;
