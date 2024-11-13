import { z } from "zod";

export const attendanceSchema = z.object({
  timeStart: z.date(),
  timeEnd: z.date(),
});

export type AttendanceForm = z.infer<typeof attendanceSchema>;
