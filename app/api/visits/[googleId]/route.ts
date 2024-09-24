import { visitSchema } from "@/app/schemas/VisitSchema";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { googleId: string };
}

export const POST = async (request: NextRequest, { params }: Params) => {
  const body = await request.json();

  const validation = visitSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json("bad request", { status: 400 });

  const { data } = validation;

  const user = await prisma.user.findFirst({
    where: {
      googleId: params.googleId,
    },
  });

  if (!user)
    return NextResponse.json("No user found. (Google ID not found)", {
      status: 404,
    });

  const visits = await prisma.visit.findMany({
    where: {
      AND: [{ userId: user.id }, { deathId: data.deathId }],
    },
  });

  if (!visits.length) {
    await prisma.visit.create({
      data: {
        userId: user?.id,
        deathId: data.deathId,
      },
    });
  } else {
  }

  return NextResponse.json(`added visits to ${user.email}`, { status: 201 });
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const visits = await prisma.visit.findMany({
    where: {
      user: {
        googleId: params.googleId,
      },
    },
    include: {
      death: true,
    },
  });

  return NextResponse.json(visits, { status: 200 });
};
