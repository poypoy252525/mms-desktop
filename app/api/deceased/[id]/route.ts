import { isValidGoogleIdToken } from "@/functions/googleAuth";
import prisma from "@/prisma/db";
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
