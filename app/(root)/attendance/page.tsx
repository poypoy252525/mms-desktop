import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import prisma from "@/prisma/db";
import AddDialog from "./AddDialog";

const page = async () => {
  const attendances = await prisma.attendance.findMany({});
  return (
    <PageContainer>
      <PageHeader>
        <div className="flex flex-col">
          <span>Attendance</span>
          <span className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString("en-PH")}
          </span>
        </div>
        <AddDialog />
      </PageHeader>
      <DataTable columns={columns} data={attendances} />
    </PageContainer>
  );
};

export default page;
