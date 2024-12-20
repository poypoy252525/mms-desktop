import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import prisma from "@/prisma/db";
import AddBurialDialog from "@/components/add-burial-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Burials = async () => {
  const burials = await prisma.burial.findMany();
  return (
    <PageContainer>
      <PageHeader>
        <span>Plot</span>
        <AddBurialDialog
          trigger={
            <Button size="sm">
              <Plus />
              Create Plot
            </Button>
          }
        />
      </PageHeader>
      <DataTable columns={columns} data={burials} />
    </PageContainer>
  );
};

export default Burials;
