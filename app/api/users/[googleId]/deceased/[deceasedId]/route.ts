import { isValidGoogleIdToken } from "@/functions/googleAuth";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { deceasedId: string; googleId: string } }
) => {
  const { message, status } = await isValidGoogleIdToken(request);
  if (status !== 200) return NextResponse.json({ message }, { status });

  try {
    const user = await prisma.user.update({
      data: {
        deceased: {
          disconnect: {
            id: params.deceasedId,
          },
        },
      },
      where: {
        googleId: params.googleId,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error deleting bookmark: ", error);
    throw error;
  }
};
