import { z } from "zod";

export const requestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  causeOfDeath: z.string(),
  dateOfBirth: z.string(),
  dateOfDeath: z.string(),
  relatives: z.array(
    z.object({
      userId: z.string(),
    })
  ),
});

export type RequestSchema = z.infer<typeof requestSchema>;
