import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/prisma/db";
import { Death } from "@prisma/client";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "../_components/DataTable";
import PageWrapper from "../_components/PageWrapper";
import { columns } from "./_components/Columns";
import FilterRecordDropdown from "./_components/FilterRecordDropdown";

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
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="flex space-x-4">
            <FilterRecordDropdown />
            <Link href="/deaths/new">
              <Button size="sm">
                <CirclePlus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </Link>
          </div>
        </div>

        <TabsContent value="all">
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>Deaths</CardTitle>
              <CardDescription>All death records as of today</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                filterColumn="firstName"
                columns={columns}
                data={data}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">Active records</TabsContent>
        <TabsContent value="archived">Archived records</TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default DeathsPage;
