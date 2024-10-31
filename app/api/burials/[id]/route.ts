import { authOptions } from "@/constants";
import prisma from "@/prisma/db";
import { burialSchema } from "@/schemas/BurialSchema";
import { BurialType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export const DELETE = async (request: NextRequest, { params }: Params) => {
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

export const PATCH = async (request: NextRequest, { params }: Params) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validation = burialSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors },
      { status: 400 }
    );

  const { data } = validation;

  let burial = await prisma.burial.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!burial)
    return NextResponse.json(
      { message: "The current burial is unavailable or not exist" },
      { status: 404 }
    );

  burial = await prisma.burial.update({
    data: {
      block: data.block,
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      row: data.row,
      type: data.type as BurialType,
    },
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(burial, { status: 200 });
};
