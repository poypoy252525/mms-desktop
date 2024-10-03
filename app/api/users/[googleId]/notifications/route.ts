import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { googleId: string };
}

export const POST = async (request: NextRequest, { params }: Params) => {};

export const GET = async (request: NextRequest, { params }: Params) => {
  const requests = await prisma.request.findMany({});

  if (!requests) return NextResponse.json("No data", { status: 200 });

  return NextResponse.json(requests, { status: 200 });
};
