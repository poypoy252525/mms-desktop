import { Button } from "@/components/ui/button";
import prisma from "@/prisma/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import PageHeading from "../_components/PageHeading";
import PageWrapper from "../_components/PageWrapper";
import DeathCard from "./_components/DeathCard";

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
      {burials.length ? (
        <div className="grid lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {burials.map((burial) => (
            <Link key={burial.id} href={`/burials/${burial.id}`}>
              <DeathCard burial={burial} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">No burial record.</p>
        </div>
      )}
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default BurialsPage;
