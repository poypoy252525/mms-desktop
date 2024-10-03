import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const requests = await prisma.request.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(requests, { status: 200 });
};
