import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/db";
import React from "react";
import { columns } from "./columns";

const Deceased = async () => {
  const deceased = await prisma.deceased.findMany({
    include: {
      owner: true,
      burial: true,
    },
  });
  return (
    <div className="container mx-auto max-w-screen-lg py-4">
      <span className="text-2xl font-semibold">Deceased</span>
      <DataTable columns={columns} data={deceased} />
    </div>
  );
};

export default Deceased;
