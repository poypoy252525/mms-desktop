import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import prisma from "@/prisma/db";
import { Burial } from "@prisma/client";
import Link from "next/link";
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
        <Link href={`/burials/${burial.id}`}>
          <CardTitle className="text-lg">
            {`${burial.block} - ${burial.row + burial.plotNumber}`}
          </CardTitle>
        </Link>
        <CardDescription>{`${death?.firstName} ${death?.lastName}`}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default DeathCard;
