import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React from "react";

const deathCard = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <img
          src="https://picsum.photos/200"
          className="w-full h-full pb-1"
          alt="profile_image"
        />
        <CardTitle className="text-lg">John Smith</CardTitle>
        <CardDescription>1993 - 2024</CardDescription>
      </CardContent>
    </Card>
  );
};

export default deathCard;
