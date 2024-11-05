import { authOptions } from "@/constants";
import prisma from "@/prisma/db";
import { ownerSchema } from "@/schemas/OwnerSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const owner = await prisma.owner.findUnique({
    where: {
      id: params.id,
    },
  });

  console.log(owner);

  if (!owner)
    return NextResponse.json({ message: "Owner not found" }, { status: 404 });

  const burial = await prisma.burial.findFirst({
    where: {
      ownerId: params.id,
    },
  });

  if (!burial) {
    await prisma.owner.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Owner deleted." }, { status: 200 });
  }

  await prisma.burial.update({
    where: {
      id: burial.id,
    },
    data: {
      owner: {
        delete: true,
      },
      isVacant: true,
    },
  });

  return NextResponse.json({ message: "success" }, { status: 200 });
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const validation = ownerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors },
      { status: 400 }
    );

  const { data } = validation;

  console.log(data);

  await prisma.owner.update({
    data: {
      burials: {
        connect: {
          id: data.burialId,
        },
      },
      name: data.name,
    },
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(
    { message: "owner updated successfully" },
    { status: 200 }
  );
};
