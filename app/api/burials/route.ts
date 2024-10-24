import prisma from "@/prisma/db";
import { burialSchema } from "@/schemas/BurialSchema";
import { BurialType } from "@prisma/client";
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

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = burialSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { data } = validation;

  let burial = await prisma.burial.findFirst({
    where: {
      AND: [{ block: data.block }, { row: data.row }],
    },
  });

  if (burial)
    return NextResponse.json("This burial already exist.", { status: 409 });

  burial = await prisma.burial.create({
    data: {
      block: data.block,
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      row: data.row,
      type: data.type as BurialType,
    },
  });

  return NextResponse.json(burial, { status: 201 });
};
