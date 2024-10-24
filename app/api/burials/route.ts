import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const ownerId = searchParams.get("ownerId") || undefined;

  console.log(ownerId);

  const burials = await prisma.burial.findMany({
    where: {
      ownerId,
    },
  });

  return NextResponse.json(burials, { status: 200 });
};
