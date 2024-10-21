import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import prisma from "@/prisma/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <div className="max-w-screen-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Users</CardTitle>
          <CardDescription>
            The users which logged in on mobile app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
