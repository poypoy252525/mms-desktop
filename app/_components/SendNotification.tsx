"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Props {
  googleId: string;
}

const SendNotification = ({ googleId }: Props) => {
  return (
    <Button
      onClick={async () => {
        await axios.post(`/api/users/${googleId}/notifications/send`, {
          expoPushToken: "ExponentPushToken[GxXY5hM7qHoE2YXvH2A7mO]",
        });
      }}
    >
      Send notification
    </Button>
  );
};

export default SendNotification;
