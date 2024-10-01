import { z } from "zod";

export const notificationSchema = z.object({
  googleId: z.string(),
  expoPushToken: z.string(),
});

export type NotificationSchema = z.infer<typeof notificationSchema>;
