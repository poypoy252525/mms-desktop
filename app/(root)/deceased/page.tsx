import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/db";
import AddDeceasedDialog from "./AddDeceasedDialog";
import { columns } from "./columns";
import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";

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
        <AddDeceasedDialog owners={owners} />
      </PageHeader>
      <DataTable columns={columns} data={deceased} />
    </PageContainer>
  );
};

export const dynamic = "force-dynamic";

export default Deceased;
