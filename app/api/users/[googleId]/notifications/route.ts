import { NextRequest } from "next/server";

interface Params {
  params: { googleId: string };
}

export const POST = async (request: NextRequest, { params }: Params) => {};

export const GET = async (request: NextRequest, { params }: Params) => {};
