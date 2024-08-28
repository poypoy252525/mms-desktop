import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Death } from "@prisma/client";
import React from "react";

export interface Detail {
  label: string;
  value: string | number;
}

const getOverviewDetails = (details: Death): Detail[] => {
  const overviewDetails: Detail[] = [
    {
      label: "First name",
      value: details.firstName,
    },
    {
      label: "Last name",
      value: details.lastName,
    },
    {
      label: "Age",
      value: details.age,
    },
    {
      label: "Cause of death",
      value: details.causeOfDeath,
    },
  ];

  return overviewDetails;
};

const DeathOverviewCard = ({ death }: { death: Death }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg tracking-tight leading-none">
          Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12">
          {getOverviewDetails(death).map((detail, index) => (
            <React.Fragment key={index}>
              <div className="text-sm col-span-3">{detail.label}</div>
              <div className="text-sm col-span-9 text-muted-foreground">
                {detail.value}
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeathOverviewCard;
