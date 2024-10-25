import { z } from "zod";

export const authSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type AuthZod = z.infer<typeof authSchema>;
