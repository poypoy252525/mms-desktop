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

const DeathRecordCard = ({ deaths }: { deaths: Death[] }) => {
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle>Deaths</CardTitle>
        <CardDescription>All death records</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable filterColumn="firstName" columns={columns} data={deaths} />
      </CardContent>
    </Card>
  );
};

export default DeathRecordCard;
