import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const burials = await prisma.burial.findMany({
    where: {
      isVacant: true,
    },
  });

  if (!burials) return NextResponse.json("no burials found", { status: 404 });

  console.log(burials);

  return NextResponse.json(burials, { status: 200 });
};
