import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Status } from "@prisma/client";
import { CirclePlus, Filter, ListFilter } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "../_components/Breadcrumbs";
import PageWrapper from "../_components/PageWrapper";
import { BreadcrumbData } from "../utilities/breadcrumb";
import { FilterDateType } from "../utilities/functions";
import LoadingDeathPage from "./_components/LoadingDeathPage";
import { Input } from "@/components/ui/input";

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

const DeathsPage = async () => {
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
            <Button size="sm" variant="outline">
              <ListFilter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Link href="/deaths/new">
              <Button size="sm">
                <CirclePlus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[120px] h-[20px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-[200px] h-[16px]" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input className="w-[300px] my-2" />
              <LoadingDeathPage />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default DeathsPage;
