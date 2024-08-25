import axios from "axios";
import PageHeading from "../_components/PageHeading";
import { DataTable } from "../_components/DataTable";
import { columns } from "./_components/Columns";
import { User } from "@prisma/client";
import PageWrapper from "../_components/PageWrapper";
import prisma from "@/prisma/db";

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
