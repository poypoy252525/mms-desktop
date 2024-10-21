import { z } from "zod";

export const userSchema = z.object({
  googleId: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string(),
  pushToken: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
