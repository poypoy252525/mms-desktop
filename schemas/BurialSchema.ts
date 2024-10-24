import { BurialType } from "@prisma/client";
import { z } from "zod";

const burialType = Object.values(BurialType) as [string];

export const burialSchema = z.object({
  block: z.string(),
  row: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  type: z.enum(burialType),
});

export type BurialZod = z.infer<typeof burialSchema>;

export const burialVacantSchema = z.object({
  isVacant: z.boolean(),
  burialId: z.string(),
});

export type BurialVacantSchemaType = z.infer<typeof burialVacantSchema>;
