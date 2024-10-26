import { authOptions } from "@/constants";
import prisma from "@/prisma/db";
import { ownerSchema } from "@/schemas/OwnerSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
      burials: {
        connect: {
          id: data.burialId,
        },
      },
    },
  });

  await prisma.burial.update({
    data: {
      isVacant: false,
    },
    where: {
      id: data.burialId,
    },
  });

  return NextResponse.json(owner, { status: 200 });
};
