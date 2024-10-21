import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const pushTokenSchema = z.object({
  expoPushToken: z.string(),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await axios.post(
    "https://exp.host/--/api/v2/push/send",
    JSON.stringify(message),
    {
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    }
  );
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validation = pushTokenSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json("invalid token", { status: 400 });

  const { data } = validation;

  try {
    sendPushNotification(data.expoPushToken);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json("notification sent.", { status: 200 });
};
