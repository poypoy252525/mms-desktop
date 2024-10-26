import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import prisma from "@/prisma/db";
import AddOwnerDialog from "@/components/add-owner-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const page = async () => {
  const owners = await prisma.owner.findMany({
    include: {
      burials: true,
    },
  });
  return (
    <PageContainer>
      <PageHeader>
        Owners
        <AddOwnerDialog
          trigger={
            <Button size="sm">
              <Plus />
              Create Owner
            </Button>
          }
        />
      </PageHeader>
      <DataTable columns={columns} data={owners} />
    </PageContainer>
  );
};

export default page;
