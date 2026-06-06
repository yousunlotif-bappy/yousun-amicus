import { NextResponse } from "next/server";

import { createRescuePlanTool } from "../../../../src/lib/agent-tools";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const applicationId = body?.applicationId;

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message: "applicationId is required",
        },
        { status: 400 }
      );
    }

    const result = await createRescuePlanTool(applicationId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Rescue workflow failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Rescue workflow failed",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}

