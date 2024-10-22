import prisma from "@/prisma/db";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const deceased = await prisma.deceased.findUnique({
    where: {
      id: params.id,
    },
    include: {
      burial: true,
      owner: true,
    },
  });
  return <div>{deceased?.name}</div>;
};

export default page;
