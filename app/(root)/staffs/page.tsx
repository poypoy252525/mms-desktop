import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import prisma from "@/prisma/db";
import { Plus } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const staffs = await prisma.staff.findMany();
  return (
    <PageContainer>
      <PageHeader>
        <span>Staffs</span>
        <div className="flex space-x-2">
          <Link href={`/staffs/new`}>
            <Button size="sm">
              <Plus /> New Staff
            </Button>
          </Link>
        </div>
      </PageHeader>
      <DataTable columns={columns} data={staffs} />
    </PageContainer>
  );
};

export default page;
