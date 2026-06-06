import { NextResponse } from "next/server";

import { createRescuePlanTool } from "@/lib/agent-tools";

/*
  POST /api/agent/rescue-plan

  This endpoint runs the YOUSUN Amicus Rescue Before Default workflow.

  Expected request body:
  {
    "applicationId": "APP-001"
  }

  Workflow:
  1. Fetch the selected loan application
  2. Evaluate early distress signals
  3. Create a responsible rescue plan
  4. Save the rescue plan to MongoDB
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const applicationId = body?.applicationId as string | undefined;

    /*
      The rescue agent needs an application ID so it knows
      which borrower profile should be reviewed.
    */
    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message: "applicationId is required.",
        },
        { status: 400 }
      );
    }

    /*
      Run the internal Rescue Before Default tool.
      The tool creates and saves a rescue plan for the selected application.
    */
    const result = await createRescuePlanTool(applicationId);

    if (!result.success) {
      return NextResponse.json(
        {
          ...result,
          message: result.message || "Rescue plan could not be created.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...result,
      message:
        "YOUSUN Amicus created a rescue-before-default plan using distress signals and responsible recovery rules.",
    });
  } catch (error) {
    console.error("Rescue workflow failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Rescue workflow failed.",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}

