import { NextResponse } from "next/server";

import { runAmicusAnalysis } from "@/lib/agent-calculations";
import { getApplicationByIdFromDb } from "@/lib/db-applications";
import { generateGeminiReport } from "@/lib/gemini-report-generator";
import { getDb } from "@/lib/mongodb";

type ReportKind = "bank_memo" | "customer_summary" | "rescue_report";

const VALID_REPORT_KINDS: ReportKind[] = [
  "bank_memo",
  "customer_summary",
  "rescue_report",
];

/*
  POST /api/gemini-report

  This route generates one AI-assisted report using Gemini.
  It accepts:
  - applicationId
  - kind

  Example body:
  {
    "applicationId": "APP-001",
    "kind": "bank_memo"
  }
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const applicationId = body?.applicationId as string | undefined;
    const kind = body?.kind as ReportKind | undefined;

    /*
      Basic request validation.
      We return a clear message so debugging from Postman/browser is easier.
    */
    if (!applicationId || !kind) {
      return NextResponse.json(
        {
          success: false,
          message: "applicationId and kind are required.",
        },
        { status: 400 }
      );
    }

    /*
      Only allow report types that our app understands.
      This protects the route from invalid report generation requests.
    */
    if (!VALID_REPORT_KINDS.includes(kind)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid report kind. Use bank_memo, customer_summary, or rescue_report.",
        },
        { status: 400 }
      );
    }

    /*
      Fetch the loan application from MongoDB.
      The repository already has fallback logic, so the app can still work
      during local demo even if MongoDB has an issue.
    */
    const application = await getApplicationByIdFromDb(applicationId);

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found.",
        },
        { status: 404 }
      );
    }

    /*
      Run the existing Amicus analysis engine.
      Gemini will use this structured result to write a better report.
    */
    const analysis = runAmicusAnalysis(application);

    /*
      Try Gemini report generation.
      Inside generateGeminiReport, fallback report generation is already handled.
    */
    const report = await generateGeminiReport(application, analysis, kind);

    /*
      Save or update the generated report in MongoDB.
      If saving fails, we still return the generated report so the demo does not break.
    */
    try {
      const db = await getDb();

      await db.collection("reports").updateOne(
        { id: report.id },
        {
          $set: {
            ...report,
            generatedBy: "Gemini",
            updatedAt: new Date().toISOString(),
          },
        },
        { upsert: true }
      );
    } catch (saveError) {
      console.error("Failed to save Gemini report:", saveError);
    }

    return NextResponse.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Gemini report API failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gemini report generation failed.",
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}


