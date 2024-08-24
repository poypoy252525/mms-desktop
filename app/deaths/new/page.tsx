import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import DeathRecordForm from "../_components/DeathRecordForm";
import BurialPickerCard from "../_components/BurialPickerCard";
import prisma from "@/prisma/db";

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
