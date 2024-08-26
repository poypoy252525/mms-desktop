import React, { useEffect } from "react";
import PageHeading from "../_components/PageHeading";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_components/Columns";
import { Death } from "@prisma/client";
import PageWrapper from "../_components/PageWrapper";
import prisma from "@/prisma/db";
import Actions from "./_components/Actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

const DeathsPage = async () => {
  const getData = async (): Promise<Death[]> => {
    return await prisma.death.findMany({});
  };

  let data;
  try {
    data = await getData();
  } catch (error) {
    return "Failed to fetch data from database (death collection)";
  }

  return (
    <PageWrapper>
      <Tabs defaultValue="today" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="weekly">Week</TabsTrigger>
            <TabsTrigger value="allTime">All time</TabsTrigger>
          </TabsList>
          <div className="flex space-x-4">
            <Button size="sm" variant="outline">
              <ListFilter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Deaths</CardTitle>
              <CardDescription>Manage the deaths record</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                filterColumn="firstName"
                columns={columns}
                data={data}
                // actions={<Actions />}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly">weekly record</TabsContent>
        <TabsContent value="allTime">All time records</TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default DeathsPage;
