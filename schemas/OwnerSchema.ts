import { z } from "zod";

export const ownerSchema = z.object({
  name: z.string(),
});

export type ownerZod = z.infer<typeof ownerSchema>;
