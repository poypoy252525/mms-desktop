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

  const burial = await prisma.burial.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!burial)
    return NextResponse.json(
      { message: "Plot does not exist." },
      { status: 404 }
    );

  await prisma.burial.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ message: "deleted" }, { status: 200 });
};
