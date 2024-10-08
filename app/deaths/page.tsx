import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/prisma/db";
import { Status } from "@prisma/client";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "../_components/Breadcrumbs";
import PageWrapper from "../_components/PageWrapper";
import { BreadcrumbData } from "../utilities/breadcrumb";
import { FilterDateType, isFilterDateType } from "../utilities/functions";
import DeathRecordCard from "./_components/DeathRecordCard";
import FilterRecordDropdown from "./_components/FilterRecordDropdown";

interface Props {
  searchParams: {
    status: Status;
    filterBy: FilterDateType;
  };
}

const filterByDate = (
  filterType: FilterDateType
): { from: Date | undefined; to: Date | undefined } => {
  let from = undefined;
  let to = undefined;
  switch (filterType) {
    case "TODAY":
      from = new Date();
      to = new Date();
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      break;
    case "WEEK":
      from = new Date();
      to = new Date();
      from.setDate(from.getDate() - 7);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      break;
    case "MONTH":
      from = new Date();
      to = new Date();
      from.setMonth(from.getMonth() - 1);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      break;
  }
  return { from, to };
};

const breadcrumbItems: BreadcrumbData[] = [
  { label: "Home", link: "/" },
  { label: "Deaths", link: "/deaths" },
];

const DeathsPage = async ({ searchParams }: Props) => {
  const { filterBy } = searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const { from, to } = filterByDate(filterBy);

  const deaths = await prisma.death.findMany({
    where: {
      status,
      dateOfDeath: {
        gte: from,
        lte: to,
      },
    },
  });

  return (
    <PageWrapper>
      <Breadcrumbs data={breadcrumbItems} />
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="flex space-x-4">
            <FilterRecordDropdown
              defaultValue={isFilterDateType(filterBy) ? filterBy : ""}
            />
            <Link href="/deaths/new">
              <Button size="sm">
                <CirclePlus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="all">
          <DeathRecordCard
            title="Deaths"
            deaths={deaths}
            description="All records of the deaths"
          />
        </TabsContent>
        <TabsContent value="active">
          <DeathRecordCard
            title="Currently Buried"
            deaths={deaths.filter((death) => death.status === "ACTIVE")}
            description="Only active records (currently buried)"
          />
        </TabsContent>
        <TabsContent value="archived">
          <DeathRecordCard
            title="Inactive"
            deaths={deaths.filter((death) => death.status === "INACTIVE")}
            description="Only inactive records (removed from burial)"
          />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default DeathsPage;
