import prisma from "@/prisma/db";
import { DataTable } from "../_components/DataTable";
import PageHeading from "../_components/PageHeading";
import PageWrapper from "../_components/PageWrapper";
import { columns } from "./_components/Columns";

const UsersPage = async () => {
  let data;
  try {
    data = await prisma.user.findMany();
  } catch (error) {
    return "Failed to load users from the database";
  }

  return (
    <PageWrapper>
      <PageHeading>Users</PageHeading>

      <DataTable filterColumn="name" columns={columns} data={data} />
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default UsersPage;
