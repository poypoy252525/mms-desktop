import { fingerprintSchema } from "@/schemas/FingerprintSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log(body);
  const validation = fingerprintSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { message: validation.error.errors[0] },
      { status: 400 }
    );

  const { data } = validation;

  return NextResponse.json(data, { status: 200 });
};

export const GET = async () => {
  return NextResponse.json("works", { status: 200 });
};
