import { DataTable } from "@/app/_components/DataTable";
import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/prisma/db";
import { columns } from "../_components/Columns";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  let burial;
  try {
    burial = await prisma.burial.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error + " failed to find burial");
  }

  let death;

  try {
    death = await prisma.death.findUnique({
      where: {
        id: burial?.deathId,
      },
    });
  } catch (error) {
    throw new Error(error + " failed to find death record");
  }

  const deaths = await prisma.death.findMany({
    where: {
      burial: {
        block: burial?.block,
        row: burial?.row,
        plotNumber: burial?.plotNumber,
      },
    },
  });

  return (
    <PageWrapper>
      <PageHeading>{`${burial?.block} - ${burial?.row}${burial?.plotNumber}`}</PageHeading>
      <h2 className="text-lg font-semibold">Current buried</h2>
      <div className="flex justify-between border-y py-5">
        <p className="text-muted-foreground">{`${death?.firstName} ${death?.lastName} - ${death?.causeOfDeath}`}</p>
        <p className="text-muted-foreground">
          {`${death?.nextOfKinName} - ${death?.nextOfKinRelationship}`}
        </p>
      </div>
      <h2 className="text-lg font-semibold">History</h2>
      <DataTable columns={columns} data={deaths} filterColumn="firstName" />
    </PageWrapper>
  );
};

export default page;
