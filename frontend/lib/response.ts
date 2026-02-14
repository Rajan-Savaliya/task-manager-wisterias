import { NextResponse } from "next/server";

// Sends a consistent JSON response
export function sendResponse(code: number, message: string, data: unknown = null) {
  return NextResponse.json(
    {
      status: code >= 200 && code < 300,
      message,
      data,
      statusCode: code,
    },
    { status: code }
  );
}
