import prisma from "@/prisma/db";
import { DataTable } from "../_components/DataTable";
import PageHeading from "../_components/PageHeading";
import PageWrapper from "../_components/PageWrapper";
import { columns } from "./_components/Columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumbs from "../_components/Breadcrumbs";
import { BreadcrumbData } from "../utilities/breadcrumb";

const breadcrumbItems: BreadcrumbData[] = [
  { label: "Home", link: "/" },
  { label: "Users", link: "/users" },
];

const UsersPage = async () => {
  let data;
  try {
    data = await prisma.user.findMany();
  } catch (error) {
    return "Failed to load users from the database";
  }

  return (
    <PageWrapper>
      <Breadcrumbs data={breadcrumbItems} />
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                list of all users have registered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable filterColumn="name" columns={columns} data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default UsersPage;
