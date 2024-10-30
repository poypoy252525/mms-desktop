import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/db";
import { columns } from "./columns";
import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import AddDeceasedDialogWithoutOwner from "@/components/add-deceased-dialog-without-owner";
import AddDeceasedDialog from "@/components/add-deceased-dialog";

const Deceased = async () => {
  const deceased = await prisma.deceased.findMany({
    include: {
      burial: {
        include: {
          owner: true,
        },
      },
    },
  });

  const owners = await prisma.owner.findMany({});

  return (
    <PageContainer>
      <PageHeader>
        <span>Deceased</span>
        <div className="flex space-x-2">
          <AddDeceasedDialogWithoutOwner />
          <AddDeceasedDialog owners={owners} />
        </div>
      </PageHeader>
      <DataTable columns={columns} data={deceased} />
    </PageContainer>
  );
};

export const dynamic = "force-dynamic";

export default Deceased;
