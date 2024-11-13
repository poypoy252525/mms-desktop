import prisma from "@/prisma/db";
import { fingerprintSchema } from "@/schemas/FingerprintSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log("body: ", body);
  const validation = fingerprintSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors[0] },
      { status: 400 }
    );

  const { data } = validation;

  const staff = await prisma.staff.findFirst({
    where: {
      fingerprintId: data.fingerprintId,
    },
  });

  if (!staff)
    return NextResponse.json(
      {
        message: `No staff has been recorded with fingerprint ID: ${data.fingerprintId}`,
      },
      { status: 404 }
    );

  try {
    const timeIn = new Date();

    const attendance = await prisma.attendance.findUnique({
      where: {
        id: data.attendanceId,
      },
    });

    if (!attendance)
      return NextResponse.json(
        { message: "attendance not found" },
        { status: 404 }
      );

    await prisma.attendance.update({
      where: {
        id: data.attendanceId,
      },
      data: {
        staffAttendances: {
          create: {
            staffId: staff.id,
            timeIn: timeIn,

            status: timeIn < attendance.timeStart ? "PRESENT" : "LATE",
          },
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("failed to create new attendance");
    throw new Error("Failed to create new attendance");
  }

  return NextResponse.json("attendance recorded.", { status: 201 });
};
