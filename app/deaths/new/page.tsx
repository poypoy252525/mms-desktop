import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/prisma/db";
import DeathRecordForm from "../_components/DeathRecordForm";
import Breadcrumbs from "../../_components/Breadcrumbs";

const CreateDeathRecord = async () => {
  const burials = await prisma.burial.findMany({
    where: {
      isVacant: true,
    },
  });

  return (
    <PageWrapper>
      <Breadcrumbs
        data={[
          { label: "Home", link: "/" },
          { label: "Deaths", link: "/deaths" },
          { label: "New", link: "/deaths/new" },
        ]}
      />
      <DeathRecordForm burials={burials} />
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default CreateDeathRecord;
