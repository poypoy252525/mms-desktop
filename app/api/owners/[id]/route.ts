import { authOptions } from "@/constants";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const owner = await prisma.owner.findUnique({
    where: {
      id: params.id,
    },
  });

  console.log(owner);

  if (!owner)
    return NextResponse.json({ message: "Owner not found" }, { status: 404 });

  const burial = await prisma.burial.findFirst({
    where: {
      ownerId: params.id,
    },
  });

  if (!burial) {
    await prisma.owner.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Owner deleted." }, { status: 200 });
  }

  await prisma.burial.update({
    where: {
      id: burial.id,
    },
    data: {
      owner: {
        delete: true,
      },
    },
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
};
