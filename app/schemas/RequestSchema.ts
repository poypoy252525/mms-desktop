import { z } from "zod";

export const requestSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  causeOfDeath: z.string(),
  dateOfBirth: z.string(),
  dateOfDeath: z.string(),
  relativeName: z.string(),
  relativeRelationship: z.string(),
  contact: z.string(),
});

export type RequestSchema = z.infer<typeof requestSchema>;
