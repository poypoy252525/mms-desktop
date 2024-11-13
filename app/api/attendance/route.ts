import prisma from "@/prisma/db";
import { attendanceSchema } from "@/schemas/attendanceSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const validation = attendanceSchema.safeParse({
    ...body,
    timeStart: new Date(body.timeStart),
    timeEnd: new Date(body.timeEnd),
  });
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors[0] },
      { status: 400 }
    );

  const { data } = validation;

  let attendance = await prisma.attendance.findFirst({
    where: {
      AND: [{ timeStart: data.timeStart }],
    },
  });

  if (attendance)
    return NextResponse.json(
      { message: "attendance already exist" },
      { status: 409 }
    );

  attendance = await prisma.attendance.create({
    data: {
      timeStart: data.timeStart,
      timeEnd: data.timeEnd,
    },
  });

  return NextResponse.json(attendance, { status: 201 });
};
