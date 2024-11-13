import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/db";
import React from "react";
import { columns } from "./columns";
import RefreshButton from "./RefreshButton";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const staff = await prisma.staff.findUnique({
    where: {
      id: params.id,
    },
    include: {
      attendances: true,
    },
  });

  return (
    <PageContainer>
      <PageHeader>
        {staff?.name}
        <RefreshButton />
      </PageHeader>
      <DataTable columns={columns} data={staff?.attendances || []} />
    </PageContainer>
  );
};

export default page;
