import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { date, z } from "zod";

const addDeathSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.date(),
  dateOfDeath: z.date(),
  causeOfDeath: z.string().min(1),
  nextOfKinName: z.string(),
  nextOfKinRelationship: z.string(),
  nextOfKinContact: z.number().min(1),
  block: z.string().min(2),
  row: z.string().min(1),
  plotNumber: z.string().min(1),
});

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

  const validation = addDeathSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const death = validation.data;

  const newDeath = await prisma.death.create({
    data: {
      firstName: death.firstName,
      lastName: death.lastName,
      causeOfDeath: death.causeOfDeath,
      dateOfBirth: death.dateOfBirth,
      dateOfDeath: death.dateOfDeath,
      nextOfKinName: death.nextOfKinName,
      nextOfKinRelationship: death.nextOfKinRelationship,
      nextOfKinContact: death.nextOfKinContact,
      burial: {
        create: {
          block: death.block,
          plotNumber: death.plotNumber,
          row: death.row,
        },
      },
    },
  });

  return NextResponse.json(newDeath, { status: 201 });
};
