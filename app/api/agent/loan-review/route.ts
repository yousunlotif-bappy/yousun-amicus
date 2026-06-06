import { NextResponse } from "next/server";

import { runLoanReviewAgentTool } from "@/lib/agent-tools";

/*
  POST /api/agent/loan-review

  This endpoint runs the main YOUSUN Amicus loan review workflow.

  Expected request body:
  {
    "applicationId": "APP-001"
  }

  Workflow:
  1. Fetch loan application
  2. Build Financial Twin
  3. Run Future Mirror scenarios
  4. Recommend safe loan amount
  5. Generate Dynamic EMI plan
  6. Prepare reports
  7. Save results to MongoDB
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const applicationId = body?.applicationId as string | undefined;

    /*
      applicationId is required because the agent needs to know
      which borrower/application it should review.
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
      Run the internal loan review agent tool.
      The tool handles analysis generation and MongoDB save/update.
    */
    const result = await runLoanReviewAgentTool(applicationId);

    if (!result.success) {
      return NextResponse.json(
        {
          ...result,
          message: result.message || "Loan review agent could not complete.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...result,
      message:
        "YOUSUN Amicus completed the loan review workflow: Financial Twin, Future Mirror, safe loan recommendation, dynamic EMI, and reports.",
    });
  } catch (error) {
    console.error("Agent workflow failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Agent workflow failed.",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}

