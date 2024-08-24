import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

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
