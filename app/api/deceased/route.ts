import { authOptions } from "@/constants";
import { isValidGoogleIdToken } from "@/functions/googleAuth";
import prisma from "@/prisma/db";
import { deceasedSchema } from "@/schemas/DeceasedSchema";
import { BurialType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const validation = deceasedSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { data } = validation;

  let deceased = await prisma.deceased.findFirst({
    where: {
      AND: [{ burialId: data.burialId }, { name: { contains: data.name } }],
    },
  });

  if (deceased)
    return NextResponse.json("This record already exist", { status: 409 });

  deceased = await prisma.deceased.create({
    data: {
      name: data.name,
      burialId: data.burialId,
    },
  });

  return NextResponse.json(deceased, { status: 201 });
};

export const GET = async (request: NextRequest) => {
  const { message, status } = await isValidGoogleIdToken(request);
  if (status !== 200) return NextResponse.json(message, { status });

  const burialtype =
    request.nextUrl.searchParams.get("burialType") || undefined;
  const search = request.nextUrl.searchParams.get("search") || undefined;

  const deceased = await prisma.deceased.findMany({
    where: {
      burial: {
        type: burialtype as BurialType,
      },
      name: { contains: search },
    },
    include: {
      burial: true,
    },
  });

  return NextResponse.json(deceased, { status: 200 });
};
