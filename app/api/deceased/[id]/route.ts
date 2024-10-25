import { authOptions } from "@/constants";
import { isValidGoogleIdToken } from "@/functions/googleAuth";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { message, status } = await isValidGoogleIdToken(request);
  if (status !== 200) return NextResponse.json(message, { status });
  const { id } = params;

  const deceased = await prisma.deceased.findUnique({
    where: {
      id,
    },
    include: {
      burial: true,
      owner: true,
    },
  });

  return NextResponse.json(deceased, { status: 200 });
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const deceased = await prisma.deceased.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!deceased)
    return NextResponse.json(
      { message: "No deceased record found" },
      { status: 404 }
    );

  await prisma.deceased.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ message: "deleted" }, { status: 200 });
};
