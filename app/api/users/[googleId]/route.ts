import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { googleId: string };
}

export const GET = async (request: NextRequest, { params }: Params) => {
  const user = await prisma.user.findFirst({
    where: {
      googleId: params.googleId,
    },
    include: {
      pushTokens: true,
    },
  });
  return NextResponse.json(user, { status: 200 });
};
