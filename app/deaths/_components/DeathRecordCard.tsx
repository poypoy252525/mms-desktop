import { DataTable } from "@/app/_components/DataTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import { columns } from "./Columns";
import { Death } from "@prisma/client";

const DeathRecordCard = ({
  deaths,
  description,
  title,
}: {
  deaths: Death[];
  description: string;
  title: string;
}) => {
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable filterColumn="firstName" columns={columns} data={deaths} />
      </CardContent>
    </Card>
  );
};

export default DeathRecordCard;
