import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Death } from "@prisma/client";
import React from "react";
import { Detail } from "./DeathOverviewCard";

const getRelativeDetails = (details: Death): Detail[] => {
  const overviewDetails: Detail[] = [
    {
      label: "Name",
      value: details.nextOfKinName,
    },
    {
      label: "Relationship",
      value: details.nextOfKinRelationship,
    },
    {
      label: "Contact",
      value: details.nextOfKinContact,
    },
  ];

  return overviewDetails;
};

const DeathRelativeCard = ({ death }: { death: Death }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg tracking-tight leading-none">
          Relatives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12">
          {getRelativeDetails(death).map((detail, index) => (
            <React.Fragment key={index}>
              <div className="col-span-3 text-sm">{detail.label}</div>
              <div className="col-span-9 text-sm text-muted-foreground">
                {detail.value}
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeathRelativeCard;
