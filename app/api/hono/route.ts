import { NextRequest, NextResponse } from "next/server";

const HONO_SERVER_URL = process.env.HONO_SERVER_URL || "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${HONO_SERVER_URL}/hono`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Hono server responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        status: "healthy",
        message: "Hono server is running",
        honoResponse: data,
        timestamp: new Date().toISOString(),
        serverUrl: HONO_SERVER_URL,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to connect to Hono server:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        message: "Failed to connect to Hono server",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
        serverUrl: HONO_SERVER_URL,
      },
      { status: 503 }
    );
  }
}
