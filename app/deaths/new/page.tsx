import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/prisma/db";
import DeathRecordForm from "../_components/DeathRecordForm";

const CreateDeathRecord = async () => {
  const burials = await prisma.burial.findMany({
    where: {
      isVacant: true,
    },
  });

  return (
    <PageWrapper>
      <PageHeading>New Record</PageHeading>
      <DeathRecordForm burials={burials} />
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default CreateDeathRecord;
