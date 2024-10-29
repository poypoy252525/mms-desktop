import { ReactNode } from "react";
import { Card, CardHeader } from "./card";

export interface Props {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

const SummaryCard = ({ description, title, value, icon }: Props) => {
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

export default SummaryCard;
