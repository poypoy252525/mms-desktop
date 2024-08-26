import { DataTable } from "@/app/_components/DataTable";
import React from "react";
import { columns } from "./Columns";
import { Burial, Death } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HistoryCard = ({ burial }: { burial: Burial & { deaths: Death[] } }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>
          Past person that buried in{" "}
          {`${burial.block}-${burial.row}${burial.plotNumber}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={
            burial?.deaths.filter((death) => death.status === "INACTIVE") || []
          }
          filterColumn="firstName"
        />
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
