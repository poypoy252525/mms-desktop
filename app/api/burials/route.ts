import { burialSchema, burialVacantSchema } from "@/app/schemas/BurialSchema";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

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

export const PATCH = async (request: NextRequest) => {
  const body = await request.json();

  const validation = burialVacantSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json("bad request", { status: 400 });

  const data = validation.data;

  const updated = await prisma.burial.update({
    data: {
      isVacant: data.isVacant,
    },
    where: {
      id: data.burialId,
    },
  });

  return NextResponse.json(updated, { status: 200 });
};
