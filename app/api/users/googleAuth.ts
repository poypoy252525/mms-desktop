import { OAuth2Client } from "google-auth-library";
import { NextRequest } from "next/server";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleIdToken = async (idToken: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.error("Error verifying token ID: ", error);
    return null;
    throw error;
  }
};

export const isValidGoogleIdToken = async (
  request: NextRequest
): Promise<{ status: number; message: string }> => {
  const authorizationHeader = request.headers.get("Authorization");
  if (!authorizationHeader)
    return { status: 401, message: "No ID token provided" };

  const idToken = authorizationHeader.split(" ")[1];
  if (!idToken) return { status: 401, message: "Unauthorized" };

  const payload = await verifyGoogleIdToken(idToken);
  if (!payload) return { status: 401, message: "Invalid token ID" };

  return { status: 200, message: "authorized" };
};
