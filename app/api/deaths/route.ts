import { newDeathSchema } from "@/app/schemas/NewDeathSchema";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const deaths = await prisma.death.findMany();

  if (!deaths)
    return NextResponse.json("Failed to get data from the database", {
      status: 404,
    });

  return NextResponse.json(deaths, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  body.dateOfBirth = new Date(body.dateOfBirth);
  body.dateOfDeath = new Date(body.dateOfDeath);

  const validation = newDeathSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const death = validation.data;

  const newDeath = await prisma.death.create({
    data: {
      firstName: death.firstName,
      lastName: death.lastName,
      age: death.age,
      causeOfDeath: death.causeOfDeath,
      dateOfBirth: death.dateOfBirth,
      dateOfDeath: death.dateOfDeath,
      nextOfKinName: death.nextOfKinName,
      nextOfKinRelationship: death.nextOfKinRelationship,
      nextOfKinContact: death.nextOfKinContact,
      burialId: death.burialId,
    },
  });

  return NextResponse.json(newDeath, { status: 201 });
};
