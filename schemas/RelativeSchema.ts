import { string, z } from "zod";

export const relativeSchema = z.object({
  users: z.array(
    z.object({
      googleId: z.string(),
    })
  ),
});

export type RelativeSchema = z.infer<typeof relativeSchema>;
