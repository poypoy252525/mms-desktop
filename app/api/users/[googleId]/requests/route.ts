import { requestSchema } from "@/app/schemas/RequestSchema";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return NextResponse.json("hello world", { status: 200 });
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { googleId: string } }
) => {
  const body = await request.json();

  const validation = requestSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { data } = validation;

  const user = await prisma.user.findFirst({
    where: {
      googleId: params.googleId,
    },
    select: {
      id: true,
    },
  });

  if (!user) return NextResponse.json("user not found", { status: 404 });

  let userRequest = await prisma.request.findFirst({
    where: {
      AND: [
        {
          formData: {
            equals: data,
          },
        },
        {
          userId: {
            equals: user.id,
          },
        },
      ],
    },
  });

  if (userRequest)
    return NextResponse.json("the user already request it", { status: 400 });

  userRequest = await prisma.request.create({
    data: {
      formData: data,
      userId: user.id,
    },
  });

  if (!userRequest)
    return NextResponse.json("the user request was not push to db", {
      status: 500,
    });

  return NextResponse.json("success", { status: 200 });
};
