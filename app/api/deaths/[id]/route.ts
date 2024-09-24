import { newDeathSchema } from "@/app/schemas/DeathSchemas";
import prisma from "@/prisma/db";
import { Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const death = await prisma.death.findUnique({
    where: {
      id,
    },
  });

  if (!death) return NextResponse.json("Not found", { status: 404 });

  return NextResponse.json(death, { status: 200 });
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const deleted = await prisma.death.delete({
    where: {
      id,
    },
  });

  if (!deleted) return NextResponse.json("Record not found", { status: 404 });

  await prisma.burial.update({
    where: {
      id: deleted.burialId,
    },
    data: {
      isVacant: true,
    },
  });

  return NextResponse.json(deleted, { status: 200 });
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();

  // body.dateOfBirth = new Date(body.dateOfBirth);
  // body.dateOfDeath = new Date(body.dateOfDeath);
  // body.dateOfBirth = new Date(body.dateOf);

  const validation = newDeathSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json("Bad request", { status: 400 });

  const { data } = validation;

  const death = await prisma.death.update({
    data: {
      age: data.age,
      firstName: data.firstName,
      lastName: data.lastName,
      causeOfDeath: data.causeOfDeath,
      dateOfBirth: data.dateOfBirth,
      dateOfDeath: data.dateOfDeath,
      nextOfKinName: data.nextOfKinName,
      nextOfKinRelationship: data.nextOfKinRelationship,
      nextOfKinContact: data.nextOfKinContact,
      status: data.status as Status,
    },
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(death, { status: 200 });
};
