import React from "react";
import PageWrapper from "../_components/PageWrapper";
import PageHeading from "../_components/PageHeading";
import prisma from "@/prisma/db";
import DeathCard from "./_components/DeathCard";

const FacilitiesPage = async () => {
  const burials = await prisma.burial.findMany();

  return (
    <PageWrapper>
      <PageHeading>Facilities</PageHeading>
      <div className="grid grid-cols-6 gap-4">
        {burials.map((burial) => (
          <DeathCard key={burial.id} burial={burial} />
        ))}
      </div>
    </PageWrapper>
  );
};

export default FacilitiesPage;
