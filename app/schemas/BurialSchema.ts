import { z } from "zod";

export const burialSchema = z.object({
  block: z.string().min(2),
  row: z.string().min(1),
  plotNumber: z.string().min(1),
});
