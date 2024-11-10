import { isValidGoogleIdToken } from "@/functions/googleAuth";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (
  request: NextRequest,
  { params }: { params: { googleId: string } }
) => {
  const { message, status } = await isValidGoogleIdToken(request);
  if (status !== 200) return NextResponse.json({ message }, { status: status });

  const user = await prisma.user.findFirst({
    where: {
      googleId: params.googleId,
    },
    include: {
      deceased: {
        include: {
          burial: true,
        },
      },
    },
  });

  return NextResponse.json(user?.deceased || [], { status: 200 });
};

const userListSchema = z.object({
  deceasedId: z.string(),
});

export const POST = async (
  request: NextRequest,
  { params }: { params: { googleId: string } }
) => {
  const { message, status } = await isValidGoogleIdToken(request);
  if (status !== 200) return NextResponse.json({ message }, { status: status });

  const body = await request.json();
  const validation = userListSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors[0] },
      { status: 400 }
    );

  const { data } = validation;

  try {
    const user = await prisma.user.update({
      data: {
        deceased: {
          connect: {
            id: data.deceasedId,
          },
        },
      },
      where: {
        googleId: params.googleId,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("error updating user list: ", error);
    throw error;
  }
};
