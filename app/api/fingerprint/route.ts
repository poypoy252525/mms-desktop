import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  console.log(await request.json());
  return NextResponse.json("working", { status: 200 });
};
