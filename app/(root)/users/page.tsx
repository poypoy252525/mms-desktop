import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import prisma from "@/prisma/db";
import { columns } from "./columns";

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <PageContainer>
      <PageHeader>Users</PageHeader>
      <DataTable columns={columns} data={users} />
    </PageContainer>
  );
};

export default Users;
