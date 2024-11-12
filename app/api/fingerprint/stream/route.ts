// app/api/fingerprint/stream/route.ts

import { NextRequest, NextResponse } from "next/server";

let clients: Set<any> = new Set();

const sendToClients = (data: string) => {
  clients.forEach((client) => {
    client.write(`data: ${data}\n\n`);
  });
};

// API endpoint to handle SSE connections (GET requests)
export const GET = async (req: NextRequest, res: NextResponse) => {
  // Set the proper headers for SSE
  res.headers.set("Content-Type", "text/event-stream");
  res.headers.set("Cache-Control", "no-cache");
  res.headers.set("Connection", "keep-alive");

  // Add the client to the set
  clients.add(res);

  // Clean up the client when the connection is closed
  req.signal.addEventListener("abort", () => {
    clients.delete(res);
  });

  // Keep the connection open
};

// POST endpoint for the ESP32 to send data
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { fingerprintId } = body;

  if (!fingerprintId) {
    return new Response(JSON.stringify({ message: "Invalid fingerprintId" }), {
      status: 400,
    });
  }

  // Send the data to all connected clients via SSE
  sendToClients(JSON.stringify({ fingerprintId }));

  return new Response(
    JSON.stringify({ message: "Data received and sent to clients" }),
    { status: 200 }
  );
};
