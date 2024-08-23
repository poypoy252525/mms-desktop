import { z } from "zod";

export const newDeathSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.date(),
  dateOfDeath: z.date(),
  causeOfDeath: z.string().min(1),
  nextOfKinName: z.string(),
  nextOfKinRelationship: z.string(),
  nextOfKinContact: z.string().min(1),
});
