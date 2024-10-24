import prisma from "@/prisma/db";
import { ownerSchema } from "@/schemas/OwnerSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = ownerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { data } = validation;

  let owner = await prisma.owner.findFirst({
    where: {
      name: data.name,
    },
  });

  if (owner) return NextResponse.json("Owner already exist", { status: 409 });

  owner = await prisma.owner.create({
    data: {
      name: data.name,
      burial: {
        connect: {
          id: data.burialId,
        },
      },
    },
  });

  return NextResponse.json(owner, { status: 200 });
};
