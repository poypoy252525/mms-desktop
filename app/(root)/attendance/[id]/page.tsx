import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/db";
import React from "react";
import { columns } from "./columns";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const attendance = await prisma.attendance.findUnique({
    where: {
      id: params.id,
    },
    include: {
      staffAttendances: {
        include: {
          staff: true,
        },
      },
    },
  });
  return (
    <PageContainer>
      <PageHeader>
        {attendance?.timeStart.toLocaleDateString("en-PH", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </PageHeader>
      <DataTable columns={columns} data={attendance?.staffAttendances || []} />
    </PageContainer>
  );
};

export default page;
