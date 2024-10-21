import prisma from "@/prisma/db";
import { userSchema } from "@/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import { isValidGoogleIdToken } from "./googleAuth";

export const GET = async (request: NextRequest) => {
  const { status, message } = await isValidGoogleIdToken(request);
  if (status !== 200) return NextResponse.json(message, { status });

  const users = await prisma.user.findMany();
  if (!users) return NextResponse.json("No user found", { status: 404 });

  return NextResponse.json(users, { status: 200 });
};

export const POST = async (request: NextRequest) => {
  const { status, message } = await isValidGoogleIdToken(request);
  if (status !== 200) return NextResponse.json(message, { status });

  const body = await request.json();
  console.log(body);

  const validation = userSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json("Bad request", { status: 400 });

  const { data } = validation;

  let user = await prisma.user.findFirst({
    where: {
      googleId: data.googleId,
    },
  });

  if (user) return NextResponse.json("User already exist", { status: 400 });

  user = await prisma.user.create({
    data: {
      googleId: data.googleId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      photo: data.photo,
      pushTokens: {
        create: {
          token: data.pushToken,
        },
      },
    },
  });

  return NextResponse.json(user, { status: 201 });
};
