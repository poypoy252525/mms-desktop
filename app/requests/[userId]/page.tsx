import prisma from "@/prisma/db";
import React from "react";

const RequestPage = async ({ params }: { params: { userId: string } }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return <div className="flex-1">{user?.email}</div>;
};

export default RequestPage;
