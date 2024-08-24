import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const burialCodeSchema = z.object({
  block: z.string().min(2),
  row: z.string().min(1),
  plotNumber: z.string().min(1),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = burialCodeSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json("bad request", { status: 400 });

  const burialCode = validation.data;

  const burial = await prisma.burial.findFirst({
    where: {
      block: burialCode.block,
      row: burialCode.row,
      plotNumber: burialCode.plotNumber,
    },
  });

  if (burial) return NextResponse.json({ isExist: true }, { status: 400 });

  return NextResponse.json({ isExist: false }, { status: 200 });
};
