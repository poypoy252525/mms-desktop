import React from "react";
import PageWrapper from "../_components/PageWrapper";
import PageHeading from "../_components/PageHeading";
import prisma from "@/prisma/db";
import DeathCard from "./_components/DeathCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const BurialsPage = async () => {
  const burials = await prisma.burial.findMany({
    include: { deaths: true },
  });

  return (
    <PageWrapper>
      <PageHeading>Burials</PageHeading>
      <div className="flex">
        <Link href={`/burials/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New slot
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {burials.map((burial) => (
          <Link key={burial.id} href={`/burials/${burial.id}`}>
            <DeathCard burial={burial} />
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
};

export default BurialsPage;
