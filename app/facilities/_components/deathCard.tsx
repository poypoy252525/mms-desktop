import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import prisma from "@/prisma/db";
import { Burial } from "@prisma/client";
import React from "react";

const DeathCard = async ({ burial }: { burial: Burial }) => {
  const death = await prisma.death.findUnique({
    where: { id: burial.deathId },
  });

  return (
    <Card>
      <CardContent className="p-4">
        <img
          src="https://picsum.photos/200"
          className="w-full h-full pb-1"
          alt="profile_image"
        />
        <CardTitle className="text-lg">{`${death?.firstName} ${death?.lastName}`}</CardTitle>
        <CardDescription>
          {`${death?.dateOfBirth} - ${death?.dateOfDeath}`}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default DeathCard;
