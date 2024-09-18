import Breadcrumbs from "@/app/_components/Breadcrumbs";
import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import { BreadcrumbData } from "@/app/utilities/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/prisma/db";
import { Death } from "@prisma/client";
import BackButton from "../../_components/BackButton";
import DeathOverviewCard from "../_components/DeathOverviewCard";
import DeathRelativeCard from "../_components/DeathRelativeCard";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import DeleteDialog from "../_components/DeleteDialog";
import EditButton from "./EditButton";

const getBreadcrumbsData = (death: Death): BreadcrumbData[] => {
  const breadcrumbsData: BreadcrumbData[] = [
    { label: "Home", link: "/" },
    { label: "Deaths", link: "/deaths" },
    {
      label: `${death.firstName} ${death.lastName}`,
      link: `/deaths/${death.id}`,
    },
  ];

  return breadcrumbsData;
};

const DeathRecordPage = async ({ params }: { params: { id: string } }) => {
  let death;
  try {
    death = await prisma.death.findUnique({
      where: {
        id: params.id,
      },
      include: {
        burial: true,
      },
    });
  } catch (error) {
    console.log(error);
  }

  if (!death) return <>No data.</>;

  const { burial } = death;

  return (
    <PageWrapper>
      <Breadcrumbs data={getBreadcrumbsData(death)} />
      <div className="flex items-start">
        <BackButton />
        <div>
          <PageHeading>{`${death?.firstName} ${death?.lastName}`}</PageHeading>
          <p className="text-xs text-muted-foreground">{`${burial.block} - ${
            burial.row + burial.plotNumber
          } | ${death.status}`}</p>
        </div>
      </div>
      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="relatives">Relatives</TabsTrigger>
          </TabsList>
          <div className="flex space-x-4">
            <DeleteDialog death={death} />
            <EditButton id={death.id} />
          </div>
        </div>
        <TabsContent value="overview">
          <DeathOverviewCard death={death} />
        </TabsContent>
        <TabsContent value="relatives">
          <DeathRelativeCard death={death} />
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export default DeathRecordPage;
