import { DataTable } from "@/app/_components/DataTable";
import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/prisma/db";
import { columns } from "../_components/Columns";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const burial = await prisma.burial.findUnique({
    where: { id },
    include: { deaths: true },
  });

  const currentDeath = burial?.deaths.find(
    (death) => death.status === "PRESENT"
  );

  return (
    <PageWrapper>
      <PageHeading>{`${burial?.block} - ${burial?.row}${burial?.plotNumber}`}</PageHeading>
      <h2 className="text-lg font-semibold">Current buried</h2>
      <div className="flex justify-between border-y py-5">
        <p className="text-muted-foreground">
          {currentDeath
            ? `${currentDeath?.firstName} ${currentDeath?.lastName} - ${currentDeath?.causeOfDeath}`
            : "vacant"}
        </p>

        {currentDeath && (
          <p className="text-muted-foreground">
            {`${currentDeath?.nextOfKinName} - ${currentDeath?.nextOfKinRelationship}`}
          </p>
        )}
      </div>
      <h2 className="text-lg font-semibold">History</h2>
      <DataTable
        columns={columns}
        data={burial?.deaths.filter((death) => death.status === "PAST") || []}
        filterColumn="firstName"
      />
    </PageWrapper>
  );
};

export default page;
