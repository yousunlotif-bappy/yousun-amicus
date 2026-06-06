import { NextResponse } from "next/server";

import { runLoanReviewAgentTool } from "../../../../src/lib/agent-tools";

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

    const result = await runLoanReviewAgentTool(applicationId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Agent workflow failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Agent workflow failed",
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
