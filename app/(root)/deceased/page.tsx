import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/db";
import AddDeceasedDialog from "./AddDeceasedDialog";
import { columns } from "./columns";

const Deceased = async () => {
  const deceased = await prisma.deceased.findMany({
    include: {
      owner: true,
      burial: true,
    },
  });

  const owners = await prisma.owner.findMany({});

  return (
    <div className="container mx-auto max-w-screen-lg py-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">Deceased</span>
        <AddDeceasedDialog owners={owners} />
      </div>
      <div className="py-4">
        <DataTable columns={columns} data={deceased} />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Deceased;
