import prisma from "@/prisma/db";
import { staffSchema } from "@/schemas/StaffSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = staffSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors[0] },
      { status: 400 }
    );

  const { data } = validation;

  try {
    let staff = await prisma.staff.findFirst({
      where: {
        name: {
          equals: data.name,
        },
      },
    });

    if (staff)
      return NextResponse.json(
        { message: "Staff already exist," },
        { status: 409 }
      );

    staff = await prisma.staff.create({
      data: {
        name: data.name,
        fingerprintId: data.fingerprintId,
      },
    });

    return NextResponse.json(staff, { status: 201 });
  } catch (error) {
    console.error("failed to create staff from prisma: ", error);
    throw error;
  }
};
