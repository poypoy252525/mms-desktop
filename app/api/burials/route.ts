import { burialSchema } from "@/app/schemas/BurialSchema";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const isVacant = request.nextUrl.searchParams.get("isVacant") || "";
  // const block = request.nextUrl.searchParams.get("block") || "";
  // const row = request.nextUrl.searchParams.get("row") || "";
  // const plotNumber = request.nextUrl.searchParams.get("plotNumber") || "";

  const burials = await prisma.burial.findFirst({
    where: {
      isVacant: isVacant === "true",
    },
  });

  if (!burials) return NextResponse.json("no burials found", { status: 404 });

  return NextResponse.json(burials, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = burialSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const burial = validation.data;

  const newBurial = await prisma.burial.create({
    data: {
      block: burial.block,
      plotNumber: burial.plotNumber,
      row: burial.row,
    },
  });

  return NextResponse.json(newBurial, { status: 201 });
};
