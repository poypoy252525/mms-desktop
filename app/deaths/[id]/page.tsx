import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/prisma/db";
import BackButton from "../_components/BackButton";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import { BreadcrumbData } from "@/app/utilities/breadcrumb";
import { Death } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import DeathOverviewCard from "../_components/DeathOverviewCard";
import DeathRelativeCard from "../_components/DeathRelativeCard";

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

  if (!death) return null;

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
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="relatives">Relatives</TabsTrigger>
        </TabsList>
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
