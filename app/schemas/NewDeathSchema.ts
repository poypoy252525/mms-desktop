import { z } from "zod";

export const newDeathSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.date(),
  dateOfDeath: z.date(),
  causeOfDeath: z.string().min(1),
  nextOfKinName: z.string().min(8),
  nextOfKinRelationship: z.string().min(2),
  nextOfKinContact: z.string().min(11, "Contact number must contain 11 digits"),
  burialId: z.string().min(5),
});
