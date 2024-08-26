import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/prisma/db";
import ActiveDeathCard from "../_components/ActiveDeathCard";
import HistoryCard from "../_components/HistoryCard";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const burial = await prisma.burial.findUnique({
    where: { id },
    include: { deaths: true },
  });

  if (!burial) return null;

  return (
    <PageWrapper>
      <PageHeading>{`${burial?.block} - ${burial?.row}${burial?.plotNumber}`}</PageHeading>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <HistoryCard burial={burial} />
        </div>
        <div className="col-span-4">
          <ActiveDeathCard burial={burial} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default page;
