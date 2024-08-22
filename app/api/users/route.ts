import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany();
  if (!users) return NextResponse.json("No user found", { status: 404 });

  return NextResponse.json(users, { status: 200 });
};
