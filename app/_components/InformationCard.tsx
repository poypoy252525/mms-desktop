import { Card, CardHeader } from "@/components/ui/card";
import { Users } from "lucide-react";
import React, { ReactNode } from "react";

export interface BriefInfo {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

const InformationCard = ({ description, title, value, icon }: BriefInfo) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between">
          <h3 className="text-sm font-medium tracking-tight">{title}</h3>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground my-0">{description}</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default InformationCard;
