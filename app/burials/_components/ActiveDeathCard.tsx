import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Burial, Death } from "@prisma/client";
import { Dot } from "lucide-react";
import React from "react";

const ActiveDeathCard = ({
  burial,
}: {
  burial: Burial & { deaths: Death[] };
}) => {
  const currentDeath = burial?.deaths.find(
    (death) => death.status === "ACTIVE"
  );

  return (
    <Card
      className={
        currentDeath && currentDeath.status === "ACTIVE"
          ? "border-green-500"
          : ""
      }
    >
      <CardHeader>
        <CardTitle
          className={
            currentDeath && currentDeath.status === "ACTIVE"
              ? "text-green-500"
              : ""
          }
        >
          {currentDeath && currentDeath.status === "ACTIVE"
            ? "Active"
            : "Vacant"}
        </CardTitle>
        <CardDescription>Summary of details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-y-1">
          <div className="text-sm text-muted-foreground">Name</div>
          <div className="text-sm font-medium tracking-tight text-end">
            {currentDeath && currentDeath.status === "ACTIVE"
              ? `${currentDeath?.firstName} ${currentDeath?.lastName}`
              : "(N/A)"}
          </div>
          <div className="text-sm text-muted-foreground">Age</div>
          <div className="text-sm font-medium tracking-tight text-end">
            {currentDeath && currentDeath.status === "ACTIVE"
              ? currentDeath?.age
              : "(N/A)"}
          </div>
          <div className="text-sm text-muted-foreground">Cause of death</div>
          <div className="text-sm font-medium tracking-tight text-end">
            {currentDeath && currentDeath.status === "ACTIVE"
              ? currentDeath?.causeOfDeath
              : "(N/A)"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveDeathCard;
