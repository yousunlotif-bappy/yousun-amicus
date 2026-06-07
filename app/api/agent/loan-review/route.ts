import { NextResponse } from "next/server";

import { runAmicusAnalysis } from "@/lib/agent-calculations";
import { getApplicationByIdFromDb } from "@/lib/db-applications";
import { getDb } from "@/lib/mongodb";
import { generateAllReports } from "@/lib/report-generator";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const applicationId = body.applicationId;

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message: "applicationId is required",
        },
        { status: 400 }
      );
    }

    const application = await getApplicationByIdFromDb(applicationId);

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 }
      );
    }

    const analysis = runAmicusAnalysis(application);
    const reports = generateAllReports(application, analysis);

    let databaseSaved = false;

    try {
      const db = await getDb();

      await db.collection("agent_analyses").updateOne(
        { applicationId },
        {
          $set: {
            applicationId,
            analysis,
            updatedAt: new Date().toISOString(),
            generatedBy: "YOUSUN Amicus Agent",
          },
        },
        { upsert: true }
      );

      if (reports.length > 0) {
        await db.collection("reports").bulkWrite(
          reports.map((report) => ({
            updateOne: {
              filter: { id: report.id },
              update: {
                $set: {
                  ...report,
                  updatedAt: new Date().toISOString(),
                  generatedBy: "YOUSUN Amicus Agent",
                },
              },
              upsert: true,
            },
          }))
        );
      }

      databaseSaved = true;
    } catch (dbError) {
      console.error("Loan review database save failed:", dbError);
    }

    return NextResponse.json({
      tool: "runLoanReviewAgent",
      success: true,
      databaseSaved,
      message:
        "YOUSUN Amicus completed the loan review workflow: Financial Twin, Future Mirror, safe loan recommendation, dynamic EMI, and reports.",
      data: {
        application,
        analysis,
        reports,
      },
    });
  } catch (error) {
    console.error("Agent workflow failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Agent workflow failed",
      },
      { status: 500 }
    );
  }
}

