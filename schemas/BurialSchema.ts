import { BurialType } from "@prisma/client";
import { z } from "zod";

const burialType = Object.values(BurialType) as [string];

export const burialSchema = z.object({
  block: z.string(),
  row: z.string(),
  coordinates: z.array(z.number()),
  type: z.enum(burialType),
  ownerId: z.string(),
});

export type BurialZod = z.infer<typeof burialSchema>;

export const burialVacantSchema = z.object({
  isVacant: z.boolean(),
  burialId: z.string(),
});

export type BurialVacantSchemaType = z.infer<typeof burialVacantSchema>;
